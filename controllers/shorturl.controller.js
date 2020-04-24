const ShortURL = require('../models/shorturl.model');
const Counter = require('../models/counter.model');
const dns = require('dns');

async function getNextSequence(name) {
    let counter = await Counter.find();

    if (counter.length === 0) {
        counter = new Counter({ _id: "shorturlid", seq: 0 });
        await counter.save();
    }

    var ret = await Counter.findOne({ _id: name });
    ret.seq++;
    await ret.save();
    return ret.seq;
 }

module.exports.postUrl = function (req, res) {
    let inputURL = req.body.url;

    //check url begin with http:// or https://
    if (!inputURL.match(/^htpp|https?:\/\//gm)) {
        return res.json({ error: "Invalid URL" });
    }
    
    let hostname = inputURL.slice(inputURL.indexOf('//') + 2).split('/')[0];
    
    dns.lookup(hostname, async (err, address) => {
        if (err) {
            return res.json({ error: "Invalid Hostname"});
        }

        var shortURL = await ShortURL.findOne({ original_url: inputURL });
        if (!shortURL) {
            let newShortURL = new ShortURL({ original_url: inputURL, _id: await getNextSequence("shorturlid") });
            newShortURL.save();
            return res.json({ original_url: inputURL, short_url: newShortURL._id });
        }
        res.json({ original_url: inputURL, short_url: shortURL._id });
    });
};

module.exports.getRedirect = async function (req, res) {
    let id = req.params.id;
    try {
        let shortURL = await ShortURL.findById(id);
        res.redirect(301, shortURL.original_url);
    } 
    catch (err) {
        res.send("Not found");
    }
};