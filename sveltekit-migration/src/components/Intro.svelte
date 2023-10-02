<script>
	import { YoutubeSolid, GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
	const skills = [
		'Javascript',
		'Nodejs',
		'OAuth',
		'Active Directory',
		'Svelte',
		'React',
		'AWS',
		'Terraform',
		'Microservice',
		'Docker',
		'Kubernetes',
		'Cyber Security',
	];
</script>

<div class="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 md:grid-cols-6">
	<div class="md:col-span-4 order-2 sm:order-1">
		<p>Hello there 👋</p>
		<h1 class="text-4xl">
			I'm 
			<span class="font-bold text-orange-500">Kousher Alam</span>
		</h1>
		<p class="mt-1">
			<span>Senior Solutions developer</span>
			<span>@</span>
			<a class="text-blue-600" href="https://ottoint.com/" target="_blank">Otto International</a>
		</p>
		<div>
			<ul class="list-none flex space-x-3 mt-1">
				<li>
					<a href="https://facebook.com" target="_blank">
						<GithubSolid class="h-6 w-6 text-gray-800 mr-4" />
					</a>
				</li>
				<li>
					<a href="https://facebook.com" target="_blank">
						<LinkedinSolid class="h-6 w-6 text-blue-500 mr-4" />
					</a>
				</li>
				<li>
					<a href="https://facebook.com" target="_blank">
						<YoutubeSolid class="h-6 w-6 text-red-500 mr-4" />
					</a>
				</li>
			</ul>
		</div>
		<p class="mt-6">
			My description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque illum magnam
			alias dicta recusandae non fuga iusto saepe ullam magni?
		</p>
		<div class="mt-6">
			<p class="flex flex-wrap space-x-2">
				{#each skills as skill}
					<span
						class="first:ml-2 border hover:bg-orange-200 cursor-no-drop border-orange-400 px-2 py-1 text-sm mb-2 rounded-lg"
						>{skill}</span
					>
				{/each}
			</p>
		</div>
	</div>
	<div class="order-1 sm:order-2 md:col-span-2 flex justify-center sm:justify-end">
		<img class="h-80 w-64 sm:pr-4" src="/avatar.svg" alt="Kousher's Profile Picture" />
	</div>
</div>

<style>
</style>
