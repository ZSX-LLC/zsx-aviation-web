# Deploying Your ZSX Aviation Website to GoDaddy

## Prerequisites
- GoDaddy account with hosting plan
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
