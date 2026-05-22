import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

// GET - Fetch all students
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        student_id as id,
        admission_no as student_id,
        full_name as name,
        COALESCE(cm.class_name || '-' || cm.section_name, 'N/A') as class,
        parent1_name as parentname,
        student_phone as contact,
        student_email as email,
        record_status as status
      FROM sgs_student_master sm
      LEFT JOIN sgs_class_master cm ON sm.class_id = cm.class_id
      WHERE sm.record_status != 'Deleted'
      ORDER BY sm.student_id
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Add new student
export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, name, class: className, parentname, contact, email, status } = body;
    
    const [class_name, section_name] = className.split('-');
    
    let classResult = await pool.query(
      `SELECT class_id FROM sgs_class_master WHERE class_name = $1 AND section_name = $2 AND record_status = 'Active'`,
      [class_name, section_name]
    );
    
    let class_id;
    if (classResult.rows.length === 0) {
      const newClass = await pool.query(
        `INSERT INTO sgs_class_master (class_name, section_name, school_id, record_status) 
         VALUES ($1, $2, 1, 'Active') RETURNING class_id`,
        [class_name, section_name]
      );
      class_id = newClass.rows[0].class_id;
    } else {
      class_id = classResult.rows[0].class_id;
    }
    
    const result = await pool.query(
      `INSERT INTO sgs_student_master 
       (admission_no, full_name, class_id, parent1_name, student_phone, student_email, record_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [student_id, name, class_id, parentname, contact, email, status || 'Active']
    );
    
    return NextResponse.json({ 
      success: true, 
      student: {
        id: result.rows[0].admission_no,
        name: result.rows[0].full_name,
        className: `${class_name}-${section_name}`,
        parentname: result.rows[0].parent1_name,
        contact: result.rows[0].student_phone,
        email: result.rows[0].student_email,
        status: result.rows[0].record_status
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update student
export async function PUT(request) {
  try {
    const body = await request.json();
    const { student_id, name, class: className, parentname, contact, email, status } = body;
    
    const [class_name, section_name] = className.split('-');
    
    let classResult = await pool.query(
      `SELECT class_id FROM sgs_class_master WHERE class_name = $1 AND section_name = $2 AND record_status = 'Active'`,
      [class_name, section_name]
    );
    
    let class_id;
    if (classResult.rows.length === 0) {
      const newClass = await pool.query(
        `INSERT INTO sgs_class_master (class_name, section_name, school_id, record_status) 
         VALUES ($1, $2, 1, 'Active') RETURNING class_id`,
        [class_name, section_name]
      );
      class_id = newClass.rows[0].class_id;
    } else {
      class_id = classResult.rows[0].class_id;
    }
    
    await pool.query(
      `UPDATE sgs_student_master 
       SET full_name = $1, class_id = $2, parent1_name = $3, student_phone = $4, student_email = $5, record_status = $6,
           modified_datetime = CURRENT_TIMESTAMP
       WHERE admission_no = $7`,
      [name, class_id, parentname, contact, email, status, student_id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Soft delete student
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await pool.query(
      `UPDATE sgs_student_master SET record_status = 'Deleted', modified_datetime = CURRENT_TIMESTAMP WHERE admission_no = $1`,
      [id]
    );
    
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
