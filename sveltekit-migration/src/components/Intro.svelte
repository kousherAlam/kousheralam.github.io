<script>
	import Certificate from './Certificate.svelte';
</script>

<div class="grid grid-cols-6">
	<div class="col-span-2">
		<p>Picture</p>
	</div>
	<div class="col-span-4">
		<h1 class="text-4xl">Hi, I'm <span class="font-bold">Kousher Alam</span></h1>
		<h2 class="text-2xl">Senior Solutions developer @ <span>Otto International</span></h2>
		<div>
			<ul>
				<li>
					<a href="https://facebook.com" target="_blank">Facebook</a>
				</li>
				<li>
					<a href="https://facebook.com" target="_blank">Facebook</a>
				</li>
				<li>
					<a href="https://facebook.com" target="_blank">Facebook</a>
				</li>
			</ul>
		</div>
		<p>
			My description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque illum magnam
			alias dicta recusandae non fuga iusto saepe ullam magni?
		</p>
		<div>
			<p>Skills</p>
		</div>
	</div>
</div>

<div class="pt-4 pb-4 mt-10">
	<div class="grid grid-cols-4 gap-3">
		<Certificate />
		<Certificate />
		<Certificate />
		<Certificate />
	</div>
</div>

<style>
</style>
