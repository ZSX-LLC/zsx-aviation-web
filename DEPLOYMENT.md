# Deploying Your ZSX Aviation Website

## ✅ Current Deployment Method: GitHub Pages (FREE)

Your website is currently deployed using **GitHub Pages** - a free hosting service from GitHub. This section documents the setup process and how to manage your site.

### Repository Information
- **Repository**: https://github.com/ZSX-LLC/zsx-aviation-web
- **Branch**: main
- **Custom Domain**: zsx.ai
- **Hosting**: GitHub Pages (Free)

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
git add index.html styles.css script.js DEPLOYMENT.md logo/ images/
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

### Testing Mode Toggle

The contact form has a testing mode. To toggle:

**In `script.js` line 66:**
- `const TESTING_MODE = true;` - Shows form data in console, doesn't send emails
- `const TESTING_MODE = false;` - Sends real emails via FormSubmit.co

Currently set to: `false` (production mode)

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
├── styles.css          (Styling and colors)
├── script.js           (Interactive features)
└── images/             (Your flight photos)
    ├── flight1.jpg
    ├── flight2.jpg
    ├── flight3.jpg
    └── flight4.jpg
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

## Contact Form Setup

The contact form uses FormSubmit.co as a free email service. To activate it:

1. **First Submission Verification**
   - When you first visit your site at https://zsx.ai
   - Fill out the contact form and submit
   - FormSubmit will send a verification email to contact@zsx.ai
   - Click the verification link in that email

2. **Set Up contact@zsx.ai Email**
   - In GoDaddy, go to "Email & Office"
   - Create email address: contact@zsx.ai
   - Set it to forward to your personal email if needed

3. **Alternative: Use Direct Mailto**
   - If FormSubmit doesn't work, the form falls back to opening the user's email client
   - This is already built into the code

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

## Quick Checklist

- [ ] Files uploaded to `public_html` directory
- [ ] Domain zsx.ai points to your hosting
- [ ] SSL certificate installed (https)
- [ ] Email contact@zsx.ai created
- [ ] Contact form tested and verified
- [ ] Flight photos uploaded to images folder
- [ ] Website tested on desktop and mobile
- [ ] All links and navigation working

Your website should now be live at **https://zsx.ai**!
