import { paginateResult } from "../Helper/Paginate.js";
import ProductModel from "../Model/ProductModel.js";
import ColorModel from "../Model/ColorModel.js";
import { errorJson, successJson } from "./Utilits/JsonRes.js";

export const store = async(req, res)=>{
    const {files, body} = req;
    const fileName = files.image.name;
    const filePath = 'Public/Images/' + fileName;
    files.image.mv(filePath, (err)=>{
        console.log(err);
    });
    
    //console.log(filePath);

    // const reqColor = JSON.parse(body.color)
    //console.log(body.color);
    
    const reqColor = JSON.parse(body.color);
    const colorQuery = [];
    //console.log(reqColor);
    
    reqColor.map((d)=>{
        colorQuery.push({_id: d});
    })
    
    //console.log(colorQuery);
    
    
    const dataColor = await ColorModel.find({
        $or: colorQuery
    });

    //console.log(dataColor);


    const result = await ProductModel.create({
        name: body.name,
        image: fileName,
        price: body.price,
        color: dataColor,
        like_count: body.like_count,
        stock: body.stock,
        gender: body.gender,
        brand: body.brand,
        category: body.category
    });

    res.json('success');
}

export const all = async (req, res) =>{
    const {page, name, gender, category, color, brand} = req.query;
    const limit  = 5;
    const sortField = '_id';
    const sortOrder = -1;

    const queryBuilder = [];

    if(name){
        queryBuilder.push({$text: {$search: name}});
    }
    if (gender) {
        queryBuilder.push({"gender": gender})
      }
    if(color){
        queryBuilder.push({"color._id": color});
    }
    if(category){
        queryBuilder.push({"category": category});
    }
    if(brand){
        queryBuilder.push({"brand": brand});
    }

    //console.log(queryBuilder);
    
    const result = await paginateResult(ProductModel, page, limit, sortField, sortOrder, queryBuilder);
    
    res.json(result);
}

export const getById = async (req, res) =>{
    const id = req.params.id;
    const result = await ProductModel.findById(id);
    res.json(result);
}

export const edit = async (req, res)=>{
    const id = req.params.id;
    const result = await ProductModel.findById(id);
    res.json(result);
}

export const update = async(req, res)=>{
    const {files, body, params} = req;
    const id = req.params.id;
    console.log(body);
    try{
        if(files){
            var fileName = files.image.name;
            const filePath = "public/images/" + fileName;
            await files.image.mv(filePath, (err)=>{
                console.log(err);
            });
            console.log(files);
        } else{
            const data = await ProductModel.findOne({_id: id});
            fileName = data.image;
            console.log(fileName);
        }
    
        const reqColor = JSON.parse(body.color);
        const colorQuery = [];
        console.log(reqColor);
    
        await reqColor.map((d)=>{
            colorQuery.push({_id: d});
        })
        
        //console.log(colorQuery);   
        const dataColor = await ColorModel.find({
            $or: colorQuery
        });
    
        console.log(dataColor);
    
        const result = await ProductModel.findByIdAndUpdate(id, {
            name: body.name,
            image: fileName,
            price: body.price,
            color: dataColor,
            like_count: body.like_count,
            stock: body.stock,
            gender: body.gender,
            brand: body.brand,
            category: body.category
        },{
            new: true
        });
    
        console.log(fileName);
        res.json('success');
    }
    catch(err){
        console.log(err)
    }
}

export const destroy = async(req, res)=>{
    const id = req.params.id;
    const data = await ProductModel.findById(id);
    if(data != null){
        const result = await ProductModel.findByIdAndDelete(id);
        if(result){
            res.json('success');
        }else{
            res.json('fail');
        }
    }else{
        res.json('no data');
    }
}