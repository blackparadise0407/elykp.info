<script lang="ts">
	type SkeletonParagraphProps = {
		rows: number;
		width: number | Array<number>;
	};

	export let paragraph: boolean | SkeletonParagraphProps = true;

	const getParagraphMeta = (
		paragraphProps: boolean | SkeletonParagraphProps,
	): { rows: number; width: number[] } => {
		if (typeof paragraphProps === 'boolean') {
			return {
				rows: 1,
				width: [],
			};
		}

		return {
			rows: paragraphProps.rows,
			width: [paragraphProps.width].flat(1),
		};
	};

	const calculateWidth = (idx: number, meta: ReturnType<typeof getParagraphMeta>) => {
		const { width, rows } = meta;
		if (!width.length) {
			return '100%';
		}
		const defaultWidth = width[0];
		if (width.length === 1) {
			if (rows > 1) {
				return idx === rows - 1 ? defaultWidth + 'px' : '100%';
			}
			return defaultWidth + 'px';
		}
		return (width?.[idx] ?? defaultWidth) + 'px';
	};

	$: paragraphMeta = getParagraphMeta(paragraph);
</script>

<div class="space-y-2">
	{#each Array(paragraphMeta.rows).fill(0) as _, idx}
		<div class="skeleton h-5 rounded" style={`width: ${calculateWidth(idx, paragraphMeta)}`} />
	{/each}
</div>

<style lang="postcss">
	.skeleton {
		@apply dark:bg-neutral-600 animate-pulse;
	}
</style>
