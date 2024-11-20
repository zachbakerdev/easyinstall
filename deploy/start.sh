cd /home/ubuntu/easyinstall || exit 1
pm2 start ecosystem.config.js
pm2 save
