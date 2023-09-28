<script>
	export let title = `Google Cybersecurity Professional Certificate`;
	export let issued = `10 Oct 2023`;
	export let verify = `https://www.credly.com/badges/63186822-9769-4af5-8717-28aa63de0cc2/public_url`;
</script>

<div class="shadow bg-slate-100 w-full min-h-[12em] py-4 px-3">
	<h4 class="text-xl">{title}</h4>

	<div aria-details="Verification badge pictutre" class="p-5">
		<img src="/aws-sol-arc-associate.png" alt="Google Verification badge" />
	</div>

	<div class="grid grid-cols-6 align-middle">
		<div class="col-span-4 align-middle">
			<p class="m-0 mt-1"><span class="text-sm">Issued:</span> <span>{issued}</span></p>
		</div>
		<div class="col-span-2 text-right">
			<a
				href={verify}
				target="_blank"
				class="inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
			>
				<svg class="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
				Verify
			</a>
		</div>
	</div>
</div>
