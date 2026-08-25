add_action( 'woocommerce_before_shop_loop', 'hq_shop_shipping_disclaimer', 5 );
function hq_shop_shipping_disclaimer() {
    // Only show on the main shop page
    if ( is_shop() ) {
        echo '<div class="woocommerce-info shipping-disclaimer">';
        echo 'Please read our <a href="/shipping-policy/" style="text-decoration: underline; font-weight: bold;">Shipping Policy</a> before placing your order.';        
        echo '</div>';
        echo '<div class="woocommerce-info shipping-disclaimer">';
        echo 'All Prices in Canadian dollars(CAD$) except in USA where prices shown are in USA dollars(USD$). Customs duties, import fees and taxes (if applicable) will be paid by the consignee. ';
        echo '</div>';
    }
}


<!--  -->

// Create the shortcode [warehouse_shipping_info]
add_shortcode( 'warehouse_shipping_info', 'display_warehouse_shipping_info_shortcode' );
function display_warehouse_shipping_info_shortcode() {
    global $product;
    if ( ! $product ) {
        return '';
    }
    
    // Replace these slugs with your actual "USA Warehouse" category slugs
    $usa_categories = array( 'reagents-and-standards', 'vials-and-bottles' );

    if ( has_term( $usa_categories, 'product_cat', $product->get_id() ) ) {
        return '<div class="warehouse-shipping" style="color: #27ae60; font-weight: bold; margin-bottom: 15px;">✈️ Ships from USA warehouse</div>';
    } else {
        return '<div class="warehouse-shipping" style="color: #2980b9; font-weight: bold; margin-bottom: 15px;">🍁 Ships from Canada warehouse</div>';
    }
}