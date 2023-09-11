# 🛍️ Store Product Questions API 
API dedicated to managing user questions and answers concerning products in the e-commerce platform.

## 📌 Overview
The Product Questions API effectively processes and serves user-generated questions and answers related to products on the e-commerce platform. It's tailored to ensure users receive comprehensive and swift information.

## ⚙️ Technical Details
- **Database**: PostgreSQL 🐘 - Chosen for its relational capabilities which guarantee organized and fast retrieval of user questions and their associated product details.
- **Deployment**: Amazon EC2 with NGINX ☁️ - Ensures reliable load balancing and swift response times.
- **Performance**: 🚀 Handles a throughput of 500 users/s with a consistent average response time of 10ms.
## 🧰 Tools & Resources

![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)<br>
![Server](https://img.shields.io/badge/Server-Express.js-green?style=for-the-badge&logo=express)<br>
![Deployment](https://img.shields.io/badge/Deployment-Amazon_EC2-orange?style=for-the-badge&logo=amazon-aws)<br>
![Load Balancer](https://img.shields.io/badge/LoadBalancer-NGINX-green?style=for-the-badge&logo=nginx)<br>
![Performance Testing](https://img.shields.io/badge/Testing-Loader.io-red?style=for-the-badge)


## 🔗 Endpoints and Usage
**1. Get Questions for a Product** 📋
```GET /:product_id/qa/questions/```
Fetches user questions associated with a specific product.

**2. Get Answers for a Question** 💬
```GET /qa/questions/:question_id/answers```
Fetches user answers for a given question.

**3. Post a Question for a Product** ❓
```POST /:product_id/qa/questions/```
Adds a new question for a specific product.

**4. Post an Answer for a Question** ➡️
```POST /qa/questions/:question_id/answers```
Adds an answer for a particular question.

**5. Mark a Question as Helpful** 👍
```PUT /qa/questions/:question_id/helpful```

## 📜 Credits
- Joe Gutman 🧑‍💻
