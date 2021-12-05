import { useState,useEffect } from "react";
const useFetch=(url)=>{
    const [data, setdata] = useState(null);
  const [pending,setpending]=useState(true);
  const [error,seterror]=useState(null);

    useEffect(()=>{
        const abortcont=new AbortController();

        setTimeout(()=>{
          fetch(url,{signal: abortcont.signal})
        .then(res=>{
         if(!res.ok)
         {
             throw error('could not fetch that data for that resource');
         }
          return res.json()
        })
        .then(data=>{
          setdata(data);
          setpending(false);
          seterror(null);
        })
        .catch(err=>{
          if(err.name==='AbortError')
          {
              console.log('fetch aborted');
          }
          else
          {
            setpending(false);
            seterror(err.message);
          }
        })
        },1000);
        return()=>{
          abortcont.abort();
        }
      },[url]);
      return {data,pending,error}
}

export default useFetch