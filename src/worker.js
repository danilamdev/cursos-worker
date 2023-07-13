export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Content-Type": 'application/json; multipart/form-data'
    };

    const formdata = await request.formData()
    const { email, html } = Object.fromEntries(formdata)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: '<no-replay@cursosextensionuniversitarios.com>',
        to: env.TO_EMAIL,
        subject: `Nuevo mensaje de ${email}`,
        html
      })
    });

    const json = await response.json()
    console.log('json', json)

    return new Response(JSON.stringify(json), { headers: corsHeaders })
  },
};
