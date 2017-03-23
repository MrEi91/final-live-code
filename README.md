# FINAL LIVE CODE

### Deskripsi
Program ini dibuat untuk memenuhi tugas final live code di phase 2

#### Step by Step pembuatan
>1. Install dependencies
2. buat model user & artikel
3. buat controller user dan artikel (CRUD)
4. buat routes untuk user dan artikel
5. buat Endpoint untuk user dan artikel

#### Daftar Endpoint USER
|       Route      |  HTTP   | Description |
|------------------|---------|-------------|
|/api/user      |   POST   |REGISTER USER |
|/api/user/login      |   POST   | LOGIN USER |
|/api/user/verify/:token   |   GET   | VERIFY TOKEN |

#### Daftar Endpoint ARTICLE
|       Route      |  HTTP   | Description |
|------------------|---------|-------------|
|/api/article      |   POST   |CREATE ARTICLE |
|/api/articles      |   GET   | GET ALL ARTICLES |
|/api/article/:slug   |   GET   | GET ONE ARTICLE |
|/api/article/:slug   |   PUT   | UPDATE ARTICLE |
|/api/article/:slug   |   DELETE   | DELETE ARTICLE |

#### cara penggunaan
```
npm install
```

```
buat .env di directory server
HOST_NAME = 127.0.0.1
DATABASE_NAME = live-code-ei
```
##### Server-Side
```
npm start
```
##### Client-Side
```
live-server
```
