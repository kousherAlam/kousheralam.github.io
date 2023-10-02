<script>
	import '../app.css';
</script>

<div class="container mx-auto pt-10 pb-10 max-w-4xl px-5">
	<slot />
</div>
<div class="py-4 text-center">
	<p class="text-sm">&copy; Kousher Alam - {new Date().getFullYear()}</p>
</div>
