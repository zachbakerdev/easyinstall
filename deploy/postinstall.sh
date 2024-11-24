cd /home/ubuntu/easyinstall || exit 1
sudo n 20
npm install
npm run build
sudo chmod -hR ubuntu ./
