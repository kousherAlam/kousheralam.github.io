<script>
	import { ArrowLeftSolid } from 'flowbite-svelte-icons';
</script>

<div class="mb-12">
	<a class="px-8 py-4 bg-orange-500 text-white" href="/">
		<div class="inline-block">
			<span class="inline-block relative top-1"
				><ArrowLeftSolid class="h-6 w-6 text-white mr-4" /></span
			>
			<span class="inline-block">Back To Home</span>
		</div>
	</a>
</div>

<slot />
