// auto-fill.js
// GitHub Pages এ এই ফাইল ব্যবহার হবে

class AutoLogin {
    constructor() {
        this.username = 'mochna11';  // 🔴 আপনার ইউজারনেম
        this.password = '543792';    // 🔴 আপনার পাসওয়ার্ড
        this.videoUrl = 'https://course.itminanpublications.com/courses/class-nursery-video-course/lessons/nursari-bangla-01/?page_tab=overview';
    }
    
    // লগইন ফর্ম খুঁজুন
    findLoginForm() {
        const possibleSelectors = [
            'input[type="email"]',
            'input[type="text"]',
            'input[name*="user"]',
            'input[name*="login"]',
            'input[placeholder*="User"]',
            'input[placeholder*="Email"]',
            'input[id*="user"]',
            'input[id*="login"]'
        ];
        
        for(let selector of possibleSelectors) {
            const field = document.querySelector(selector);
            if(field) return field;
        }
        return null;
    }
    
    // পাসওয়ার্ড ফিল্ড খুঁজুন
    findPasswordField() {
        const possibleSelectors = [
            'input[type="password"]',
            'input[name*="pass"]',
            'input[placeholder*="Password"]',
            'input[id*="pass"]'
        ];
        
        for(let selector of possibleSelectors) {
            const field = document.querySelector(selector);
            if(field) return field;
        }
        return null;
    }
    
    // লগইন বাটন খুঁজুন
    findLoginButton() {
        const possibleSelectors = [
            'button[type="submit"]',
            'input[type="submit"]',
            'button:contains("Login")',
            'button:contains("Sign In")',
            'input[value*="Login"]',
            'input[value*="Sign In"]'
        ];
        
        for(let selector of possibleSelectors) {
            const button = document.querySelector(selector);
            if(button) return button;
        }
        
        // কোনো বাটন না পেলে ফর্ম খুঁজুন
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) return forms[0];
        
        return null;
    }
    
    // অটোফিল চালু করুন
    startAutoFill() {
        console.log('Auto-fill started...');
        
        const usernameField = this.findLoginForm();
        const passwordField = this.findPasswordField();
        
        if(usernameField && passwordField) {
            // মান সেট করুন
            usernameField.value = this.username;
            passwordField.value = this.password;
            
            // ইভেন্ট ট্রিগার
            usernameField.dispatchEvent(new Event('input', { bubbles: true }));
            passwordField.dispatchEvent(new Event('input', { bubbles: true }));
            
            console.log('Login credentials filled');
            
            // 3 সেকেন্ড পর সাবমিট
            setTimeout(() => {
                const loginButton = this.findLoginButton();
                if(loginButton) {
                    if(loginButton.tagName === 'FORM') {
                        loginButton.submit();
                    } else {
                        loginButton.click();
                    }
                    console.log('Form submitted');
                }
            }, 3000);
            
            return true;
        }
        
        return false;
    }
}

// পেজ লোড হলে অটোফিল চালু
document.addEventListener('DOMContentLoaded', function() {
    const autologin = new AutoLogin();
    
    // URL চেক করুন যদি লগইন পেজ হয়
    if(window.location.href.includes('login') || 
       window.location.href.includes('signin') ||
       document.querySelector('input[type="password"]')) {
        
        setTimeout(() => {
            const success = autologin.startAutoFill();
            if(success) {
                console.log('Auto login successful');
            } else {
                console.log('Login form not found');
            }
        }, 2000);
    }
});