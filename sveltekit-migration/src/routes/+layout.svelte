<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Welcome to Kousher's Webstie</title>
</svelte:head>

<div class="container mx-auto pt-10 pb-10 max-w-4xl px-5">
	<slot />
</div>
<div class="py-4 text-center">
	&copy; Copyright 2023 by Kousher Alam | <a href="https://github.com" target="_blank">(Commit)</a>
</div>
