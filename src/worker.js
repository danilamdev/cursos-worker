/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
			"Content-Type": 'application/json; multipart/form-data'
    };

		console.log('method is; ', request.method)
		console.log('headers is:', request.headers.get('Content-Type'))
		const formdata = await request.formData()
		
		const data = Object.fromEntries(formdata)
		const json = JSON.stringify(data)

		const response = new Response(json, {headers: corsHeaders})


		return response
	},
};
