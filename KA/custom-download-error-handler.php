 <?php
/**
 * Plugin Name: Custom Download Error Handler
 * Description: Overrides the default wp_die() error page for download limit errors. Created 2025-May-21
 * Version: 1.01
 * Author: Carlos Castillo
 * Author URI: https://github.com/castillocarlosr
 */

function my_custom_wp_die_handler( $message, $title = '', $args = array() ) {
    // Check for the download limit error message.
    if ( is_string( $message ) && strpos( $message, 'download limit' ) !== false ) {
        // Customize these variables according to your branding.
        $logo_url      = 'https://knowledgeanywhere.com/wp-content/uploads/2025/05/KA-logo-for-errors.png';
        $home_link     = home_url();
        $shop_link     = home_url('/courses/');
        $support_email = 'support@knowledgeanywhere.com';

        // Build your custom HTML.
        echo '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> Download Error </title>
            <style>
                body {
                    font-family: sans-serif;
                    background: #fff;
                    padding: 20px;
                    text-align: center;
                }
                h1 {
                    color: red;
                    font-size: 1.1em;
                }
                .logo {
                    max-width: 777px;
                    margin-bottom: 20px;
                }
                .container {
                    max-width: 888px;
                    margin: 40px auto;
                    padding: 30px;
                    background: #edfbff;
                    box-shadow: 0 4px 20px rgba(0, 123, 140, 0.2);
                    border-radius: 13px;
                }
                a {
                    color: #016087;
                    text-decoration: none;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img class="logo" src="' . esc_url( $logo_url ) . '" alt="Knowledge Anywhere Logo">
                <h1> Download Error </h1>
                <p>Sorry, you have reached your download limit for this file.</p>
                <p>Once a file has been downloaded, it cannot be downloaded again.</p>
                <p>
                    <a href="' . esc_url( $home_link ) . '">Home</a>  | 
                    <a href="' . esc_url( $shop_link ) . '">Visit our Shop</a>
                </p>
                <p>
                    If you need help regarding your purchase, please contact  <a href="mailto:' . esc_attr( $support_email ) . '">support@knowledgeanywhere.com</a>.
                </p>
            </div>
        </body>
        </html>';
        exit();
    }
    
    // For other errors, use the default handler.
    _default_wp_die_handler( $message, $title, $args );
}

add_filter( 'wp_die_handler', function() {
    return 'my_custom_wp_die_handler';
} );

/**
 * WooCommerce: always show the variation price, even when it matches
 * the parent product's price. Fixes the "Course Pricing" price not
 * appearing above the Add to Cart button on variable products where
 * every variation shares the same price (e.g. single SCORM-only
 * courses). Added 2026-08-26 at Carlos's request.
 */
add_filter( 'woocommerce_show_variation_price', '__return_true' );
