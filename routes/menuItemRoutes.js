const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async(req, res)=>{
    try{
        const data = req.body
        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('data saved')
        res.status(200).json(response);

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get("/",async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched successfully');
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get("/:tasteType",async(req,res)=>{
    try{
        const tasteType = req.params.tasteType; // // Extract the work type from the URL parameter
        if(tasteType =='spicy' || tasteType =='sower'||tasteType =='sweet'){
        const response = await MenuItem.find({taste: tasteType});
        console.log('response fetched');
        res.status(200).json(response);
       }
       else{
             res.status(404).json({error:'Invalid work type'});
       }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.put('/:id', async(req,res)=>{
    try{
        const MenuItemId = req.params.id;
        const updatedMenuItemIdData = req.body;

        const response = await MenuItem.findByIdAndUpdate(MenuItemId, updatedMenuItemIdData,{
            new:true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});   
       }
})
 
router.delete('/:id', async(req, res)=>{
    try{
        const MenuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(MenuItemId);
        if (!response){
            return res.status(404).json({error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});   
}
})

module.exports = router;