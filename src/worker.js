// export default {
// 	async fetch(request, env, ctx) {
// 		const corsHeaders = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
// 			"Content-Type": 'application/json; multipart/form-data'
//     };

// 		console.log('method is; ', request.method)
// 		console.log('headers is:', request.headers.get('Content-Type'))
// 		// const formdata = await request.formData()
		
// 		// const data = Object.fromEntries(formdata)
// 		// const json = JSON.stringify(data)

// 		// const response = new Response(json, {headers: corsHeaders})

// 		console.log(env.MY_API)
// 		console.log(env.API_KEY)

// 		const  response = new Response(JSON.stringify({status: 'ok'}))

// 		return response
// 	},
// };


export default {
  async fetch(request, env, ctx) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
			"Content-Type": 'application/json; multipart/form-data'
		};
   
		const formdata = await request.formData()
		const {nombre, email, mensaje, html} = Object.fromEntries(formdata)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Cursos de Extension <onboarding@resend.dev>',
        to: env.TO_EMAIL,
        subject: `Nuevo mensaje de ${email}`,
        html
      })
    });
    
    const json = await response.json()
		console.log('json', json)

		return new Response(JSON.stringify(json), {headers: corsHeaders})
  },
};
