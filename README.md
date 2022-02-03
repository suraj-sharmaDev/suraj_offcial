# Required redirects .htaccess

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# If this file exists in some folder other than main domain then put following .htacess in main domain directory

RewriteEngine On

RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

#ADD TRAILING SLASH TO DIRECTORY IF NONE EXISTS
RewriteRule ^([^\.]+[^/])$ http://%{HTTP_HOST}/$1/ [L]

RewriteCond %{HTTP_HOST} ^(www.)?crypt4bits.com$ [NC]
RewriteCond %{REQUEST_URI} !crypt4bits.com/ [NC]
RewriteRule ^(.*)$ /crypt4bits.com/$1 [L]