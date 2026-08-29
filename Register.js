<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Register - Lecture Reminder</title>

    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #17120f;
            color: #f5eee8;

            min-height: 100vh;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 20px;
        }

        .register-container {
            width: 100%;
            max-width: 400px;

            background: #241a15;

            border: 1px solid #4b3428;

            border-radius: 18px;

            padding: 30px;

            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .logo {
            text-align: center;
            font-size: 50px;
            margin-bottom: 10px;
        }

        h1 {
            text-align: center;
            color: #d6a77a;
            margin-bottom: 8px;
        }

        .subtitle {
            text-align: center;
            color: #a99688;
            font-size: 14px;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 7px;
            color: #d8c7ba;
            font-size: 14px;
        }

        input {
            width: 100%;
            padding: 14px;

            border-radius: 9px;

            border: 1px solid #5a4030;

            background: #17120f;

            color: white;

            outline: none;

            font-size: 15px;
        }

        input:focus {
            border-color: #d6a77a;
        }

        .register-btn {
            width: 100%;

            padding: 14px;

            border: none;

            border-radius: 9px;

            background: #a66b3f;

            color: white;

            font-size: 16px;

            font-weight: bold;

            cursor: pointer;
        }

        .register-btn:hover {
            background: #c18455;
        }

        .message {
            text-align: center;

            margin-top: 15px;

            font-size: 14px;

            min-height: 20px;
        }

        .login {
            text-align: center;

            margin-top: 25px;

            color: #a99688;

            font-size: 14px;
        }

        .login a {
            color: #d6a77a;

            text-decoration: none;

            font-weight: bold;
        }

    </style>

</head>


<body>


    <div class="register-container">

        <div class="logo">
            📚
        </div>

        <h1>
            Create Account
        </h1>

        <p class="subtitle">
            Register for Lecture Reminder
        </p>


        <form id="registerForm">

            <div class="form-group">

                <label>
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Create a password"
                    minlength="6"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Confirm Password
                </label>

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    minlength="6"
                    required
                >

            </div>


            <button
                type="submit"
                class="register-btn"
            >
                📝 Create Account
            </button>


            <div
                id="message"
                class="message"
            ></div>

        </form>


        <div class="login">

            Already have an account?

            <a href="login.html">
                Login
            </a>

        </div>

    </div>


    <script
        type="module"
        src="register.js"
    ></script>


</body>

  </html>
