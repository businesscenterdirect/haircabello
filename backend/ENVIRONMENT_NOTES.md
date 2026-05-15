# HairCabello Environment Variables Documentation

This document explains the purpose of each variable in your `.env` file and where to obtain the correct values.

## 1. Core Settings
| Variable | Purpose | Recommended Value |
| :--- | :--- | :--- |
| `PORT` | The port the backend server runs on. | `5000` |
| `NODE_ENV` | Sets the environment mode. | `development` or `production` |

## 2. Database (MongoDB)
| Variable | Purpose | Where to find it |
| :--- | :--- | :--- |
| `MONGO_URI` | The connection string for your MongoDB Atlas cluster. | MongoDB Atlas -> Cluster -> Connect -> Drivers |

> [!IMPORTANT]
> If you get `ECONNREFUSED`, check your **Network Access** in MongoDB Atlas to ensure your IP is whitelisted.

## 3. Security & Authentication
| Variable | Purpose | Value |
| :--- | :--- | :--- |
| `JWT_SECRET` | Used to sign and verify login tokens (JWTs). | Any long, random string (e.g., `shhh_dont_tell_anyone`) |

## 4. Payments (Stripe)
| Variable | Purpose | Where to find it |
| :--- | :--- | :--- |
| `STRIPE_SECRET_KEY` | Allows the backend to create customers and subscriptions. | Stripe Dashboard -> Developers -> API Keys (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Validates that payment notifications actually come from Stripe. | Stripe Dashboard -> Developers -> Webhooks |

## 5. Frontend Integration
| Variable | Purpose | Value |
| :--- | :--- | :--- |
| `FRONTEND_URL` | Used for CORS (allows the frontend to talk to the backend). | `http://localhost:5173` |
| `FRONTEND_MEMBER_URL` | Used in emails to link users to their login page. | `http://localhost:5173` |

## 6. Email Service (Resend)
| Variable | Purpose | Where to find it |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Allows the backend to send welcome emails to new members. | [Resend.com](https://resend.com) Dashboard -> API Keys |

## 7. Image Uploads (Cloudinary)
| Variable | Purpose | Where to find it |
| :--- | :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary account name. | Cloudinary Dashboard -> Product Environment Settings |
| `CLOUDINARY_API_KEY` | Public key for image uploads. | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Private key for image uploads. | Cloudinary Dashboard |

---

### How to use this:
1. Open your `.env` file.
2. Replace the `placeholder` values with your actual keys from the dashboards above.
3. Restart the backend server for changes to take effect.
