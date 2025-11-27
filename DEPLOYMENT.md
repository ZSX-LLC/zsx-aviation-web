# Deploying Your ZSX Aviation Website

## ✅ Current Deployment Method: GitHub Pages (FREE)

Your website is currently deployed using **GitHub Pages** - a free hosting service from GitHub. This section documents the setup process and how to manage your site.

### Repository Information
- **Repository**: https://github.com/ZSX-LLC/zsx-aviation-web
- **Branch**: main
- **Custom Domain**: zsx.ai
- **Hosting**: GitHub Pages (Free)
- **Live Site**: https://zsx.ai

---

## GitHub Pages Deployment (Current Setup)

### Prerequisites
- GitHub account (ZSX-LLC organization)
- Domain zsx.ai configured in GoDaddy
- Git installed on your computer

### Initial Setup (Already Completed)

#### 1. Create Git Repository
```bash
cd /path/to/zsx-cfi
git init
git add index.html styles.css script.js DEPLOYMENT.md logo/ images/ videos/ thank-you.html
git commit -m "Initial commit: ZSX Aviation website"
```

#### 2. Connect to GitHub
```bash
git remote add origin https://github.com/ZSX-LLC/zsx-aviation-web.git
git branch -M main
git push -u origin main
```

#### 3. Enable GitHub Pages
1. Go to repository: https://github.com/ZSX-LLC/zsx-aviation-web
2. Click **Settings** → **Pages**
3. Under "Source", select **"Deploy from a branch"**
4. Under "Branch", select **"main"** and **"/ (root)"**
5. Click **Save**

#### 4. Configure Custom Domain
Created `CNAME` file with content: `zsx.ai`

#### 5. Configure GoDaddy DNS Settings
In GoDaddy DNS management for zsx.ai, set up:

**A Records (4 records pointing to GitHub Pages):**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

**CNAME Record (for www subdomain):**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | zsx-llc.github.io | 600 |

**Note:** DNS propagation takes 5-30 minutes. SSL certificate generation takes 10-30 minutes after DNS propagates.

### Updating Your Website

To update your website content:

```bash
# Navigate to your project directory
cd /path/to/zsx-cfi

# Make your changes to files (index.html, styles.css, etc.)

# Add and commit changes
git add .
git commit -m "Description of your changes"

# Push to GitHub (automatically deploys)
git push
```

GitHub Pages will automatically rebuild and deploy your site within 1-2 minutes.

### Contact Form Configuration

The contact form uses **FormSubmit.co** for email handling with the following setup:

**Current Settings (in `index.html`):**
- **Recipient**: contact@zsx.ai
- **Thank You Page**: https://zsx.ai/thank-you.html (custom page on your domain)
- **Autoresponse**: Enabled - users receive confirmation email after submission
- **Form Mode**: Native HTML form submission (in `script.js` line 124: `USE_NATIVE_FORM = true`)

**Features:**
- Users see loading state ("Sending...") when submitting
- After submission, redirects to custom thank you page with reminder to check junk folder
- Users receive autoresponse email: "Thank you for your inquiry! Your message has been sent to our admin office. We will contact you soon."
- Form data sent to contact@zsx.ai in table format

### Local Development and Testing

**Running a Local Server:**
```bash
cd /path/to/zsx-cfi
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser to test changes before deploying.

**Common Issues Found and Fixed:**
1. **Gallery images not displaying**: Fixed duplicate `.slide` CSS rule (position: absolute vs relative conflict)
2. **Images have no z-index**: Added `z-index: 1` to `.slide img` to ensure images display above background
3. **Video commented out**: Ensure video element is uncommented in index.html
4. **File attributes blocking media**: Run `xattr -cr images/ videos/` to remove macOS extended attributes that may block files
5. **FormSubmit verification emails in junk**: Check spam/junk folder for verification emails from FormSubmit

### Troubleshooting

**SSL Certificate Errors:**
- If you see "ERR_CERT_COMMON_NAME_INVALID", wait 10-30 minutes for certificate generation
- GitHub automatically issues Let's Encrypt SSL certificates for custom domains
- Check GitHub Settings → Pages to see certificate status

**Site Not Updating:**
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check GitHub Actions tab for build status
- Wait 1-2 minutes after pushing for deployment

**DNS Issues:**
- Verify DNS records in GoDaddy match exactly as shown above
- Use `dig zsx.ai` or https://dnschecker.org to verify DNS propagation

**Gallery Images Not Showing:**
- Verify images are committed: `git ls-files images/`
- Check for CSS conflicts: ensure only one `.slide` CSS rule exists
- Verify images have z-index: `.slide img` should have `z-index: 1`
- Test locally first using `python3 -m http.server 8000`

**Video Not Playing:**
- Check video is not commented out in HTML
- Verify video file exists: `ls -lh videos/`
- Check browser console for errors
- Ensure video has correct path: `videos/areo-1.mp4`

---

## Alternative: GoDaddy Hosting (Not Currently Used)

**Note:** This section is kept for reference. Your site is NOT currently using GoDaddy hosting, only the domain registration.

## Prerequisites
- GoDaddy account with hosting plan (requires purchase)
- Domain zsx.ai configured in GoDaddy
- FTP credentials from GoDaddy

## Files to Upload

Your website consists of these files:
```
zsx-cfi/
├── index.html          (Main webpage)
├── thank-you.html      (Post-submission thank you page)
├── styles.css          (Styling and colors)
├── script.js           (Interactive features)
├── DEPLOYMENT.md       (This file)
├── logo/               (Company logo)
│   └── zsx_logo.png
├── images/             (Flight photos - 4 images)
│   ├── flight1.jpg
│   ├── flight2.jpg
│   ├── flight3.jpg
│   └── flight4.jpg
└── videos/             (Background video)
    └── areo-1.mp4      (Hero section video, 95% coverage with 8px blur)
```

## Deployment Steps

### Option 1: Using GoDaddy File Manager (Easiest)

1. **Log into GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Access File Manager**
   - Go to "My Products"
   - Find your Web Hosting plan
   - Click "Manage" next to your hosting
   - Click "File Manager" or "cPanel"

3. **Navigate to Root Directory**
   - Go to `public_html` folder (this is your website root)
   - Delete any existing files (like `index.html` or placeholder pages)

4. **Upload Your Files**
   - Click "Upload" button
   - Upload these files to `public_html`:
     - index.html
     - styles.css
     - script.js
   - Create a folder called `images`
   - Upload your 4 flight photos into the `images` folder

5. **Set Permissions**
   - Right-click on `index.html`
   - Set permissions to 644
   - Do the same for styles.css and script.js

### Option 2: Using FTP Client (FileZilla - Recommended for easier management)

1. **Download FileZilla**
   - Download from https://filezilla-project.org/
   - Install on your computer

2. **Get FTP Credentials from GoDaddy**
   - In GoDaddy dashboard, go to Web Hosting
   - Click "Manage" → "Settings" → "FTP/SFTP"
   - Note down:
     - FTP Host (usually ftp.zsx.ai or your server IP)
     - Username
     - Password
     - Port (usually 21)

3. **Connect via FileZilla**
   - Open FileZilla
   - Enter:
     - Host: Your FTP host
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: 21
   - Click "Quickconnect"

4. **Upload Files**
   - On the left side: Navigate to your local `zsx-cfi` folder
   - On the right side: Navigate to `public_html` folder
   - Drag and drop all files from left to right:
     - index.html
     - styles.css
     - script.js
     - images folder (with all photos inside)

### Option 3: Using GoDaddy Website Builder Alternative

If you want a simpler solution without FTP:

1. **Enable Git Deployment** (if available on your plan)
   - Some GoDaddy plans support Git
   - You can push directly from your computer

2. **Or Use GoDaddy's Quick Install**
   - Upload files via the web interface as described in Option 1

## Setting Up Your Domain (zsx.ai)

1. **Point Domain to Hosting**
   - In GoDaddy, go to "My Products" → "Domains"
   - Click on zsx.ai → "Manage DNS"
   - Ensure the A record points to your hosting IP
   - This should be automatically configured if hosting and domain are both on GoDaddy

2. **SSL Certificate (HTTPS)**
   - In your hosting dashboard
   - Go to "SSL Certificates"
   - Install a free SSL certificate for zsx.ai
   - This makes your site secure (https://zsx.ai)

## Contact Form Setup (FormSubmit.co)

The contact form uses FormSubmit.co as a free email service.

**Current Configuration:**
- **Email recipient**: contact@zsx.ai
- **Thank you redirect**: https://zsx.ai/thank-you.html (custom page with 15s auto-redirect)
- **Autoresponse**: Enabled (users receive confirmation email)
- **Status**: ✅ Already verified and working

**Setup Steps (Already Completed):**
1. Form configured in `index.html` with action="https://formsubmit.co/contact@zsx.ai"
2. Verification email sent to contact@zsx.ai and confirmed
3. Custom thank you page created at thank-you.html
4. Autoresponse message configured

**Important Notes:**
- FormSubmit verification emails often go to junk/spam folder - remind users to check
- First-time setup requires clicking verification link in email
- Do NOT add `_captcha=false` parameter as it disables autoresponse feature

## Testing Your Website

After deployment:

1. **Visit your site**: https://zsx.ai
2. **Test all features**:
   - Navigation links (smooth scrolling)
   - Photo gallery (sliding carousel)
   - Contact form submission
   - Mobile responsiveness (test on phone)

3. **Common Issues**:
   - If photos don't show: Check that images are in `public_html/images/` folder
   - If CSS doesn't load: Check file names match exactly (styles.css)
   - If contact form fails: Check that contact@zsx.ai email exists

## Adding Your Photos

1. Take or select 4 high-quality photos:
   - Flight training session
   - Aircraft/cockpit
   - Scenic aerial view
   - Student success or aviation moment

2. Rename them:
   - flight1.jpg
   - flight2.jpg
   - flight3.jpg
   - flight4.jpg

3. Upload to the `images` folder on your server

## Customization Tips

After deployment, you can customize:

1. **Update "About" section**: Edit index.html line 54-80
2. **Change your name/credentials**: Edit the text in index.html
3. **Update colors**: Modify styles.css variables (lines 10-19)
4. **Add more photos**: Add more `.slide` divs in index.html

## Support

- **GoDaddy Support**: 1-480-505-8877 (24/7)
- **File Manager Help**: https://www.godaddy.com/help/file-manager-2319
- **FTP Help**: https://www.godaddy.com/help/ftp-10859

## Website Features Summary

**✅ Implemented Features:**
- Single-page responsive website with smooth scrolling navigation
- Aviation-themed color palette (blues with warm orange accents)
- ZSX Aviation branding with clickable logo (zsx_logo.png)
- Hero section with background video (areo-1.mp4, 95% coverage, 8px blur)
- About section with 3 feature cards
- Services section with 4 training offerings
- Gallery carousel with 4 flight photos, auto-advance every 5 seconds
- Contact form with name, email, phone, interest fields
- FormSubmit.co integration for email handling
- Custom thank you page with auto-redirect
- Content protection (disabled right-click, text selection, image dragging)
- Copyright watermark on gallery images
- Mobile-responsive design

**Quick Deployment Checklist:**
- [x] GitHub repository created: ZSX-LLC/zsx-aviation-web
- [x] GitHub Pages enabled
- [x] Custom domain zsx.ai configured
- [x] DNS records pointing to GitHub Pages
- [x] SSL certificate active (https)
- [x] Contact form verified with FormSubmit
- [x] All images and video uploaded
- [x] Website live and tested

Your website is live at **https://zsx.ai**!

To update: Make changes locally → `git add .` → `git commit -m "message"` → `git push` → Wait 1-2 minutes
