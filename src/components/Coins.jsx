import React, { useEffect,useState } from 'react'
import axios from "axios"
import { server } from "../index";
import { Button, Container, Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack, } from '@chakra-ui/react';
import Loader from "./Loader"
import Error from "./Error"
import { Link } from 'react-router-dom';




const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("inr");






  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";



  const changePage = (page)=>  {
    setPage(page);
    setLoading(true);
  }


  const btns = new Array(132).fill(1)

  



useEffect(() => {
const fetchcoins = async() =>{
  try {
    const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

  setCoins(data);
  setLoading(false);
    
  } catch (error) {
    setError(true)
    setLoading(false)
    
  }
};
fetchcoins();
}, [currency,page])


if (error) return <Error message={"Error While Fetching Coins"} />


  return (

    <Container maxW={"container.xl"}>
{loading ? <Loader/> : <>

<RadioGroup value={currency} onChange={setCurrency} p={"8"}>
  <HStack spacing={"4"}>
  <Radio value={"inr"}>INR</Radio>
  <Radio value={"usd"}>USD</Radio>
  <Radio value={"eur"}>EUR</Radio>
  </HStack>
</RadioGroup>

<HStack wrap={"wrap"} justifyContent={'space-evenly'}>
  {coins.map((i) =>(
   <Coincard 
   id={i.id} 
   key={i.id} 
   name={i.name} 
   price={i.current_price} 
   img={i.image} 
   symbol={i.symbol} 
   currencySymbol={currencySymbol}
    />
  ))}
</HStack>

<HStack w={"full"} overflow={"auto"} p={"8"}>

  {
btns.map( (item,index)=> (
    <Button key={index} bgColor={"blackAlpha.900"} color={"white"}  
   onClick={()=>changePage(index+1)} > {index+1} </Button>
   ))
}

</HStack>

</> }    
    </Container>
  )
}


const Coincard = ({id,name,img,symbol,price,currencySymbol="₹"})=>{

  return (
    <Link to={`/coin/${id}`}>
      <VStack w={"52"} shadow={"lg"} p={"10"} 
      borderRadius={"lg"} transition={"all o.3s"} 
      margin={"4"} css={{
        "&:hover":{
          transform:"scale(1.1)"
        }
      }} >
        <Image src={img} 
        w={"10"} 
        h={"10"} 
        objectFit={"cointain"} 
        alt={'exchange'} 
        />
  
        <Heading size={"md"} noOfLines={1}>
          {symbol}
          </Heading>
  
        <Text noOfLines={1}>{name}</Text>  
        <Text noOfLines={1}>{price? `${currencySymbol}${price}`: "NA"}</Text>  
      </VStack>
    </Link>
  )
}


export default Coins;