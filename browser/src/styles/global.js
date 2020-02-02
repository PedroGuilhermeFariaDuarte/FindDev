import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    
    *,*::before,*::after{
        margin:0;
        padding:0;
        outline:none;
        border:none;
        box-sizing:border-box;
    }

    
    html,body,#root{
        height:100%;
    }

    body{        
        background:#E5E6F0;   
        -webkit-font-smoothing: antialiased;               
    }
    
    body,input,button {
        font-family: Roboto,sans-serif;        
    }

    strong {
        font-size: 20px;
        text-align: center;
        display: block;
        color: #333;    
    }

    @media screen and (min-width:320px) and (max-width: 1024px){
     ul.list_devs  {
         grid-template-columns: 1fr;

     }

     ul.list_devs  li:active{
         border:1px solid #7d40e7;
     }


     #groupButton_header.button:active{
         color: #666;
     }
    }
`;
