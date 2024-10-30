import { useState, useTransition } from "react";
import baklava from './image-baklava-desktop.jpg'
import brownie from './image-brownie-desktop.jpg'
import macaron from './image-macaron-desktop.jpg'
import creme from './image-creme-brulee-desktop.jpg'
import waffle from './image-waffle-desktop.jpg'
import tiramisu from './image-tiramisu-desktop.jpg'
import pie from './image-meringue-desktop.jpg'
import panna from './image-panna-cotta-desktop.jpg'
import cake from './image-cake-desktop.jpg'

const ProductItem = ({ product, onAdd }) => {
    return (
      <div style={{width:'30%', padding:'15px'}}>
        <img src={product.image} alt="" style={{width:'100%', borderRadius:'20px'}}/>
        <div style={{width:'100%', display:'flex', justifyContent:"center"}}>
        <button style={{ fontSize:'22px', borderRadius:'9999px', padding:'10px', color:'white', backgroundColor:'brown'}} onClick={() => onAdd(product)}>Add to Cart</button>
        </div>
        <h2 style={{color:'brown'}}>{product.cardheading}</h2>
        <p style={{color:'grey'}}>{product.productname} - <span style={{color:'brown', fontWeight:'bold'}}>${product.price}</span></p>
      </div>
    );
  };

const Full = () => {
    const productlist = [
        {cardheading:'Waffle with berries', productname:'waffle', price:'6.50', id:'1', image: waffle},
        {cardheading:'Vanilla Bean Creme Brulee', productname:'Creme Brulee', price:"7.00", id:'2', image: creme},
        {cardheading:'Macaron Mix of Five', productname:'Macaron', price:'8.00', id:'3', image:macaron},
        {cardheading:'Classic Tiramisu', productname:'Tiramisu', price:'5.50', id:'4', image:tiramisu},
        {cardheading:"Pistachio baklava", productname:'Baklava', price:'4.00', id:'5', image:baklava},
        {cardheading:'Lemon Moringue Pie', productname:'Pie', price:'5.00', id:'6', image:pie},
        {cardheading:'Red Velvet Cake', productname:'Cake', price:'4.50', id:'7', image:cake},
        {cardheading:"Salted Caramel Brownie", productname:'Brownie', id:'8', price:'4.50', image:brownie},
        {cardheading:'Vanilla Panna Cotta', productname:'Panna Cotta', id:'9', price:'6.50', image:panna}
    ]
    const [cartitems, setcarditems] = useState([])

    const Additem = (product) => {
        setcarditems((prevItems) => {
            const existingitem = prevItems.find(item => item.id === product.id);

            if (existingitem){
                return prevItems.map(item=>
                    item.id===product.id 
                    ? {...item, counter: item.counter+1} 
                    : item
                )
            }
            else{
                return [...prevItems, {...product, counter: 1}];
            }
        }
            
        )
    }

    const DecrementItem = (productId)=>{
        setcarditems((prevItems)=>{
            const existingitem = prevItems.find(item=> item.id === productId)

            if (existingitem){
                if(existingitem.counter>1){
                    return prevItems.map(item=>
                        item.id===productId
                        ? {...item, counter: item.counter -1}
                        : item
                    )
                }else{
                    return prevItems.filter(item=> item.id !== productId)
                }
                
            }return prevItems;
        })
    }

    const incrementItem = (productId)=>{
        setcarditems((prevItems)=> {
            return prevItems.map(item=>
                item.id===productId
                ? {...item, counter: item.counter +1}
                : item
            )
        })
    }

    const [trial, settrial] = useState([1,2,4])
    const Deletefunc = () => {
        settrial([])
}
    const totalPrice =cartitems.reduce((total, item) => total + (item.price * item.counter), 0);
    const totalItems =cartitems.reduce((total, item) => total + item.counter, 0)

    return(
        <div style={{display:"flex", width:'100%', justifyContent:'space-around'}}>
            <div style={{width:'60%'}}>
            <h1>Products</h1>
            <div>
            <p style={{display:'flex', flexWrap:'wrap', width:"90%", justifyContent:'space-around',}}>{productlist.map((product) => (
                <ProductItem key={product.id} product={product} onAdd={Additem} />
            ))}</p></div>
            </div>
            <div style={{width:'25%', borderRadius:'20px', padding:'10px'}}>
            <h2 style={{fontSize:'26px', fontWeight:'bold', color:'brown'}}>Your Cart ({totalItems})</h2>
            <p style={{display:'flex', width:'100%',flexWrap:'wrap', justifyContent:'space-around',}}>
                {cartitems.length > 0 ? (cartitems.map(item => (
                    <div style={{width:'40%', textAlign:'center', margin:'5px', border:'1px solid blue', borderRadius:'20px', padding:'10px'}}>
                        <img src={item.image} style={{width:"80%", height:'auto', borderRadius:'20px'}} alt={item.productname} />
                        <p>{item.productname}- ${(item.price*item.counter).toFixed(2)} - {item.counter} </p>
                        <div style={{width:'100%', display:'flex', justifyContent:"space-around"}}>
                        <button style={{borderRadius:'9999px', fontSize:'30px', alignItems:'center', display:"flex", justifyContent:'center', flexDirection:'column', width:'40px', height:'40px', backgroundColor:'lightgreen', color:'white'}} onClick={()=>incrementItem(item.id)}>+</button>
                        <button style={{borderRadius:'9999px', fontSize:'30px', alignItems:'center', display:"flex", justifyContent:'center', flexDirection:'column', width:'40px', height:'40px', backgroundColor:'red', color:'white'}} onClick={()=>DecrementItem(item.id)}>-</button>
                    </div>
                    </div>
                ))
            ):(
                <p style={{fontSize:'26px', fontWeight:'bold', color:'brown'}}>Oops! No items</p>
            )
                }
            </p>
            <p style={{fontSize:'26px', fontWeight:'bold', color:'brown'}}>Total = ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}
export default Full
