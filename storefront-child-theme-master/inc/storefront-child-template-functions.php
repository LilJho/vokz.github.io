<?php


if ( ! function_exists( 'storefront_site_branding' ) ) {
	/**
	 * Site branding wrapper and display
	 *
	 * @since  1.0.0
	 * @return void
	 */
	function storefront_site_branding() {
		storefront_site_title_or_logo();
	}
}

if ( ! function_exists( 'storefront_site_title_or_logo' ) ) {
	/**
	 * Display the site title or logo
	 *
	 * @since  2.1.0
	 * @return void
	 */
	function storefront_site_title_or_logo() {
		if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
			$logo = get_custom_logo();

			echo $logo = is_home() ? '<h1 class="logo animated fadeInDownShort go">' . $logo . '</h1>' : $logo;
		} elseif ( function_exists( 'jetpack_has_site_logo' ) && jetpack_has_site_logo() ) {
			jetpack_the_site_logo();
		} else {
			$tag = is_home() ? 'h1' : 'div';

			echo '<' . esc_attr( $tag ) . ' class="logo animated fadeInDownShort go"><a href="' . esc_url( home_url( '/' ) ) . '" rel="home">' . esc_attr( get_bloginfo( 'name' ) ) . '</a></' . esc_attr( $tag ) .'>';

			if ( '' != get_bloginfo( 'description' ) ) { ?>
				<p class="site-description"><?php echo bloginfo( 'description' ); ?></p>
				<?php
			}
		}
	}
}


if ( ! function_exists( 'storefront_product_search' ) ) {
	/**
	 * Display Product Search
	 *
	 * @since  1.0.0
	 * @uses  is_woocommerce_activated() check if WooCommerce is activated
	 * @return void
	 */
	function storefront_product_search() {
		if ( is_woocommerce_activated() ) { ?>
			<div class="cart">
					<div class="rightBox clearfix animated fadeInRightShort go">
						<div class="cartStats">
							<div class="cartBox">
								<span>Cart</span>
							</div>
							<div class="cartCount">
								<span>(Empty)</span>
							</div>
						</div>
						<div class="searchBox">
							<?php the_widget( 'WC_Widget_Product_Search', 'title=' ); ?>
						</div>
					</div>
				</div>
		<?php
		}
	}
}