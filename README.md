### TABLES

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(250) NOT NULL
)
```

```sql
CREATE TABLE favorites (
    fav_id SERIAL PRIMARY KEY,
    place_key TEXT,
    place_details JSON NOT NULL,
    fav_user INT REFERENCES users(user_id)
)
```

```sql
CREATE TABLE blacklist (
    bl_id SERIAL PRIMARY KEY,
    place_key TEXT,
    place_details JSON NOT NULL,
    bl_user INT REFERENCES users(user_id)
)
```
