<?php

/**
 * Search and Replace
 *
 * Plugin Name: WIS Blocks Search and Replace
 * Description: Implementation for search and replace for WIS Blocks
 * Version:     1.6
 * Author:      Anthony Chukwu
 * License:     GPLv2 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: Search and Replace
 * Domain Path: /languages
 * Requires at least: 4.9
 * Requires PHP: 5.2.4
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU
 * General Public License version 2, as published by the Free Software Foundation. You may NOT assume
 * that you can use any other version of the GPL.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

if (!defined('ABSPATH')) {
	die('Invalid request.');
}

function my_enqueue($hook)
{
	// Only add to the edit.php admin page.
	// See WP docs.
	if ('post.php' !== $hook) {
		return;
	}
	wp_register_script('wbsar_script', plugin_dir_url(__FILE__) . '/src/script.js', '', 1.0, true);
	wp_enqueue_script('wbsar_script');
	wp_enqueue_style('wbsar_style', plugin_dir_url(__FILE__) . '/src/style.css', '', true);
}

add_action('admin_enqueue_scripts', 'my_enqueue');


add_action("add_meta_boxes", "wbsar_add_post_meta_box");
function wbsar_add_post_meta_box()
{
	add_meta_box("wbsar-custom-meta-fields", "WIS Blocks Search and Replace", "wbsar_post_box_markup", "post", "side", "high", null);
}

function wbsar_post_box_markup($post)
{
	wp_nonce_field(basename(__FILE__), "wbsar-post-additional-fields-nonce");

?>
	<div class="wbsar-wrapper">
		<p>An excerpt of the first paragraph will be shown by default. Untick do disable.</p>
		<div class="wbsar-search-wrapper">
			<label for=""><span class="">Search:</span> <span id="wbsar-search-count" class="count">Count: <strong class="">0</strong> </span> </label>
			<div class="wbsar-search-input-wrapper">
				<input id="wbsar-search-input" type="text" placeholder="Enter Your Search Phrase">
				<svg id="wbsar-search-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
					<path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
				</svg>
			</div>
		</div>
		<div class="wbsar-case-wrapper">
			<label for="">
				<input type="checkbox" name="" id="wbsar-case-checkbox">
				Case Sensitive
			</label>
		</div>
		<div class="wbsar-replace-wrapper">
			<label for=""><span class="">Replace:</span> <span id="wbsar-replace-count" class="count">Count: <strong class="">0</strong> </span> </label>
			<input id="wbsar-replace-input" type="text" placeholder="Enter Your Replace Phrase">
		</div>
		<div class="">
			<button id="wbsar-replace-button" type="button" class="components-button is-primary">Replace </button>
		</div>
	</div>
<?
}
