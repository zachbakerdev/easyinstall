cd /home/ubuntu/easyinstall || exit 1
sudo n 20
npm install
npm run build
sudo chown -hR ubuntu ./
sudo chmod -R 755 ./dist/
