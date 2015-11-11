express = require("express")
app = express()

app.get "/random/:min/:max", (req, res) ->
  min = parseInt(req.params.min)
  max = parseInt(req.params.max)

  if (isNaN(min) || isNaN(max))
    res.status(400)
    res.json({error: "Bad request."})

  result = Math.round((Math.random() * (max-min)) + min)

  res.json({result: result})


app.listen 3000, ->
  console.log("App Started on port 3000.")