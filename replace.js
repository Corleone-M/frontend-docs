const fs = require('fs');
const path = require('path');

function readFileList(dir, level) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    // 递归读取文件
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), level + 1);
    }

    // 替换文件内容
    if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = '';
      console.log('fullPath:', fullPath);
      if (level === 1) {
        newContent = content.replace(/href=\"\//gm, 'href="./').replace(/src=\"\//gm, 'src="./');
      }
      if (level === 2) {
        newContent = content.replace(/href=\"\//gm, 'href="../').replace(/src=\"\//gm, 'src="../');
      }
      fs.writeFileSync(fullPath, newContent, 'utf8');
    }
  });
}

readFileList(`${__dirname}\\dist`, 1);