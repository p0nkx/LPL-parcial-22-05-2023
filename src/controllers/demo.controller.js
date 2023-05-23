const getAll = (req, res)=>{
    res.status(200).json({mensje:"hola mundo desde controllert"})
}

module.export = { getAll}