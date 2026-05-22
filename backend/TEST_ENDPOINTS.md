# Testing the New Admin Endpoints

## Prerequisites
1. FastAPI backend running on `http://localhost:5000`
2. You must be logged in as a super admin (cookie-based auth)

---

## 1. Test GET /admin/users

### Get all pending users
```bash
curl -X GET "http://localhost:5000/admin/users?status=P" \
  -H "Cookie: session=your-session-cookie" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "users": [
    {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "interest": "WAREHOUSING",
      "is_active": false,
      "registration_complete": true,
      "record_status": "Active",
      "created_at": "2026-05-09T09:10:35.253Z",
      "status": "P"
    }
  ]
}
```

### Search users
```bash
curl -X GET "http://localhost:5000/admin/users?search=john" \
  -H "Cookie: session=your-session-cookie"
```

### Get active users
```bash
curl -X GET "http://localhost:5000/admin/users?status=A" \
  -H "Cookie: session=your-session-cookie"
```

---

## 2. Test PUT /admin/users/update-status

### Activate users (bulk)
```bash
curl -X PUT "http://localhost:5000/admin/users/update-status" \
  -H "Cookie: session=your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{
    "userIds": [1, 2, 3],
    "newStatus": "A"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "3 user(s) activated",
  "updatedUsers": [
    {"user_id": 1, "name": "John Doe"},
    {"user_id": 2, "name": "Jane Smith"},
    {"user_id": 3, "name": "Bob Wilson"}
  ]
}
```

### Deactivate a user
```bash
curl -X PUT "http://localhost:5000/admin/users/update-status" \
  -H "Cookie: session=your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{
    "userIds": [1],
    "newStatus": "I"
  }'
```

### Delete a user (soft delete)
```bash
curl -X PUT "http://localhost:5000/admin/users/update-status" \
  -H "Cookie: session=your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{
    "userIds": [1],
    "newStatus": "D"
  }'
```

---

## 3. Test GET /admin/users/stats

```bash
curl -X GET "http://localhost:5000/admin/users/stats" \
  -H "Cookie: session=your-session-cookie"
```

**Expected Response:**
```json
{
  "success": true,
  "stats": {
    "active": 150,
    "inactive": 25,
    "pending": 10,
    "deleted": 5,
    "total": 190
  }
}
```

---

## Testing from Browser (DevTools Console)

If you're logged in to the admin panel, you can test directly from browser console:

```javascript
// Test GET users
fetch('http://localhost:5000/admin/users?status=P', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);

// Test update status
fetch('http://localhost:5000/admin/users/update-status', {
  method: 'PUT',
  credentials: 'include',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({userIds: [1], newStatus: 'A'})
}).then(r => r.json()).then(console.log);

// Test stats
fetch('http://localhost:5000/admin/users/stats', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);
```

---

## Common Issues

### 401 Unauthorized
- Make sure you're logged in as a super admin
- Check that cookies are being sent with the request

### 500 Internal Server Error
- Check FastAPI logs for database connection issues
- Verify DATABASE_URL is set correctly in backend `.env`

### Empty user list when expecting results
- Check the status filter logic
- Verify database has users with the expected status

---

## Next Steps

Once all three endpoints are working:
1. Restart Next.js frontend: `npm run dev`
2. Test user activation flow in the UI
3. Verify changes persist in database
4. Check that no duplicate users appear after refresh
