const { folderSize, format, db, fileUpload, buildPage, ZWS } = require("./requires.js")

function main(app, config) {

  app.use(
    fileUpload({
      limits: { fileSize: config.sizeLimit },
      safeFileNames: true,
      preserveExtension: true,
    })
  );

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/landing/index.html');
  });

  app.get('/file.svg', (req, res) => {
    res.sendFile(__dirname + '/landing/file.svg');
  });

  app.get('/hard-drive.svg', (req, res) => {
    res.sendFile(__dirname + '/landing/hard-drive.svg');
  });

  app.get('/img.svg', (req, res) => {
    res.sendFile(__dirname + '/landing/img.svg');
  });

  app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/landing/script.js');
  });

  app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/landing/style.css');
  });

  app.get('/stats', (req, res) => {
    const size = format(folderSize("./util", { attributes: ['size'] }).size)
    const amount = folderSize("./util").children.length
    res.send(JSON.stringify({ totalSize: size, totalAmount: amount }))
  });

  app.post("/upload", (req, res) => {
    if (req.body.key !== config.key) {
      res.sendStatus(401);
      return;
    }
    if (!req.files || !req.files.file) {
      res.sendStatus(400);
      return;
    }
    const file = req.files.file;
    const id = ZWS.encode(Date.now());
    file.mv(path.join(__dirname, `storage/${file.name}`), (error) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      db.set(id, file.name).then(function () {
        res.send(`https://i.smol.win/${id}`);
      }
      );
    });
  }
  );

  app.get("/:id", (req, res) => {
    if (!db.has(req.params.id)) {
      res.redirect("/");
      return;
    }
    res.send(buildPage("https://i.smol.win/raw/" + req.params.id));
  }
  );

  app.get("/raw/:id", (req, res) => {
    if (!db.has(req.params.id)) {
      res.redirect("/");
      return;
    }
    res.sendFile(__dirname + "/storage/" + db.get(req.params.id));
  }
  );

  app.listen(3000, () => {
    console.log('server started');
  });

}

module.exports = main