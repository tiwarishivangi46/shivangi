module.exports.setFlash = function(req,res,next){ //middlewasre to respond to flash 
    res.locals.flash={
        'success' : req.flash('success'),//take out from flash and put  it into locals
        'error' : req.flash('error')

    }
    next();
}







