// ============================================
// PURE VALIDATION FUNCTIONS
// ============================================

function isValidStudentNumber(value) {
    const trimmedValue = value.trim();

    return /^\d{2}-\d{4}-\d{3}$/.test(trimmedValue);
}


function isValidPassword(value) {
    if (/\s/.test(value)) {
        return false;
    }

    if (value.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(value)) {
        return false;
    }

    if (!/\d/.test(value)) {
        return false;
    }

    if (!/[@$!]/.test(value)) {
        return false;
    }

    return true;
}


// ============================================
// COMMONJS EXPORT FOR AUTOGRADER
// ============================================

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}


// ============================================
// BROWSER CODE
// ============================================

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");

    const successMessage = document.getElementById("successMessage");
    const registrationSummary =
        document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber =
        document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber =
        document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");


    // ============================================
    // ERROR HELPER
    // ============================================

    function setError(input, errorElement, message) {

        errorElement.textContent = message;

        if (message) {
            input.setAttribute("aria-invalid", "true");
        } else {
            input.setAttribute("aria-invalid", "false");
        }
    }


    // ============================================
    // FULL NAME VALIDATION
    // ============================================

    function validateFullName() {

        const value = fullName.value.trim();

        if (value.length === 0) {

            setError(
                fullName,
                fullNameError,
                "Full name is required."
            );

            return false;
        }

        if (value.length < 2) {

            setError(
                fullName,
                fullNameError,
                "Full name must be at least two characters."
            );

            return false;
        }

        setError(fullName, fullNameError, "");

        return true;
    }


    // ============================================
    // STUDENT NUMBER VALIDATION
    // ============================================

    function validateStudentNumber() {

        const value = studentNumber.value.trim();

        if (value.length === 0) {

            setError(
                studentNumber,
                studentNumberError,
                "Student number is required."
            );

            return false;
        }

        if (!isValidStudentNumber(value)) {

            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );

            return false;
        }

        setError(studentNumber, studentNumberError, "");

        return true;
    }


    // ============================================
    // EMAIL VALIDATION
    // ============================================

    function validateEmail() {

        const value = email.value.trim();

        if (value.length === 0) {

            setError(
                email,
                emailError,
                "Email address is required."
            );

            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {

            setError(
                email,
                emailError,
                "Enter a valid email address."
            );

            return false;
        }

        setError(email, emailError, "");

        return true;
    }


    // ============================================
    // MOBILE NUMBER VALIDATION
    // ============================================

    function validateMobileNumber() {

        const value = mobileNumber.value.trim();

        if (value.length === 0) {

            setError(
                mobileNumber,
                mobileNumberError,
                "Mobile number is required."
            );

            return false;
        }

        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {

            setError(
                mobileNumber,
                mobileNumberError,
                "Enter 09XXXXXXXXX or +639XXXXXXXXX without spaces or hyphens."
            );

            return false;
        }

        setError(mobileNumber, mobileNumberError, "");

        return true;
    }


    // ============================================
    // PASSWORD VALIDATION
    // ============================================

    function validatePassword() {

        const value = password.value;

        if (value.length === 0) {

            setError(
                password,
                passwordError,
                "Password is required."
            );

            return false;
        }

        if (!isValidPassword(value)) {

            setError(
                password,
                passwordError,
                "Password must be at least 8 characters, contain one uppercase letter, one digit, and one of @, $, or !, with no spaces."
            );

            return false;
        }

        setError(password, passwordError, "");

        return true;
    }


    // ============================================
    // CONFIRM PASSWORD VALIDATION
    // ============================================

    function validateConfirmPassword() {

        const value = confirmPassword.value;

        if (value.length === 0) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );

            return false;
        }

        if (value !== password.value) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );

            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");

        return true;
    }


    // ============================================
    // COURSE VALIDATION
    // ============================================

    function validateCourse() {

        if (course.value !== "BSIT" && course.value !== "BSCS") {

            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );

            return false;
        }

        setError(course, courseError, "");

        return true;
    }


    // ============================================
    // TERMS VALIDATION
    // ============================================

    function validateTerms() {

        if (!terms.checked) {

            terms.setAttribute("aria-invalid", "true");

            termsError.textContent =
                "You must agree to the terms and conditions.";

            return false;
        }

        terms.setAttribute("aria-invalid", "false");

        termsError.textContent = "";

        return true;
    }


    // ============================================
    // PASSWORD LIVE FEEDBACK
    // ============================================

    password.addEventListener("input", function () {

        const value = password.value;

        if (value.length === 0) {

            passwordFeedback.textContent = "";
            return;
        }

        if (isValidPassword(value)) {

            passwordFeedback.textContent =
                "Password meets all requirements.";

        } else {

            passwordFeedback.textContent =
                "Password must be at least 8 characters, include an uppercase letter, a digit, and @, $, or !, with no spaces.";
        }
    });


    // ============================================
    // FULL NAME BLUR EVENT
    // ============================================

    fullName.addEventListener("blur", function () {

        validateFullName();

    });


    // ============================================
    // COURSE CHANGE EVENT
    // ============================================

    course.addEventListener("change", function () {

        validateCourse();

    });


    // ============================================
    // TERMS CHANGE EVENT
    // ============================================

    terms.addEventListener("change", function () {

        validateTerms();

    });


    // ============================================
    // FORM SUBMIT EVENT
    // ============================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const validFullName = validateFullName();
        const validStudentNumber = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobileNumber = validateMobileNumber();
        const validPassword = validatePassword();
        const validConfirmPassword = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        const isValid =
            validFullName &&
            validStudentNumber &&
            validEmail &&
            validMobileNumber &&
            validPassword &&
            validConfirmPassword &&
            validCourse &&
            validTerms;


        if (!isValid) {

            successMessage.hidden = true;
            registrationSummary.hidden = true;

            return;
        }


        // ========================================
        // DISPLAY SUCCESS MESSAGE
        // ========================================

        successMessage.textContent =
            "Registration details validated successfully!";

        successMessage.hidden = false;


        // ========================================
        // DISPLAY SUMMARY
        // IMPORTANT: textContent ONLY
        // ========================================

        summaryName.textContent =
            fullName.value.trim();

        summaryStudentNumber.textContent =
            studentNumber.value.trim();

        summaryEmail.textContent =
            email.value.trim();

        summaryMobileNumber.textContent =
            mobileNumber.value.trim();

        summaryCourse.textContent =
            course.value;


        registrationSummary.hidden = false;

    });


    // ============================================
    // RESET EVENT
    // ============================================

    form.addEventListener("reset", function () {

        setTimeout(function () {

            fullNameError.textContent = "";
            studentNumberError.textContent = "";
            emailError.textContent = "";
            mobileNumberError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            courseError.textContent = "";
            termsError.textContent = "";

            passwordFeedback.textContent = "";

            successMessage.textContent = "";
            successMessage.hidden = true;

            registrationSummary.hidden = true;

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";


            const fields = [
                fullName,
                studentNumber,
                email,
                mobileNumber,
                password,
                confirmPassword,
                course,
                terms
            ];

            fields.forEach(function (field) {
                field.setAttribute("aria-invalid", "false");
            });

        }, 0);

    });

}
