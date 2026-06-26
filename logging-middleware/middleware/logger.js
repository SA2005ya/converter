async function Log(stack,level,packageName,message){

    const res = await fetch(
        "http://localhost:4000/api/log",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                stack,
                level,
                package:packageName,
                message,
                time:new Date()
            })
        }
    )

    const data = await res.text()

    console.log(data)
}
if (typeof module !== "undefined") {
  module.exports = Log;
}