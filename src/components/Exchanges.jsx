import React, { useEffect,useState } from 'react'
import axios from "axios"
import { server } from "../index";
import { Container, Heading,
  HStack,
  Image,
  Text,
  VStack, } from '@chakra-ui/react';
import Loader from "./Loader"
import Error from "./Error"



const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)



useEffect(() => {
const fetchexchanges = async() =>{
  try {
    const {data} = await axios.get(`${server}/exchanges?per_page=250`)

  setExchanges(data);
  setLoading(false);
    
  } catch (error) {
    setError(true)
    setLoading(false)
    
  }

};
fetchexchanges();
}, [])

if (error) return <Error message={"Error While Fetching Exchanges"} />



  return (

   
    <Container maxW={"container.xl"}>
{loading ? <Loader/> : <>

<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
  {exchanges.map((i) =>(
   <Exchangecard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank}
   url={i.url} />
  ))}
  
</HStack>


</> }
      
    </Container>
  )
}


const Exchangecard = ({name,img,rank,url})=>{

  return (
    <a href={url} target ={"blank"}>
      <VStack w={"52"} shadow={"lg"} p={"8"} 
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
          {rank}
          </Heading>
  
        <Text noOfLines={1}>{name}</Text>  
      </VStack>
    </a>
  )
}

export default Exchanges