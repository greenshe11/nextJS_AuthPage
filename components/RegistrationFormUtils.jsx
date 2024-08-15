import bcrypt from "bcryptjs";

export default async function handleSubmit (e, email, password, password2, router){
    
    e.preventDefault(); //prevent refresh when button is clicked
    if (!email || !password){
     
        alert("Title and description are required!");
    }else  if (password!=password2){
      alert("Passwords do not match!");
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
          const res = await fetch('api/topics',{
              method: "POST",
              headers: {
                  "Content-type": "application/json",
              },
              body: JSON.stringify({email, password: hashedPassword}),
          })

          if (res.ok){
            alert("Successfully created account!")
              router.push('/');
             
          }else{
              throw new Error("failed");
          }
      }catch(error){
        console.log(error);
      }
    }
}