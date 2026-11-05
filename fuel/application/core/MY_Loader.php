<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

/* load the MX_Loader class */
require FUEL_PATH."core/Loader.php";

class MY_Loader extends Fuel_Loader
{
	/**
	 * Load the database drivers
	 *
	 * Fuel_Loader::database() contains a check meant to reuse an already open
	 * database connection, but it tests `isset($CI->db)` without ever defining
	 * $CI inside the method, so the test always fails and DB() is called on
	 * every load. DB() always instantiates a fresh driver, so every single
	 * model instantiation opened a brand new MySQL connection, and each model
	 * kept its own clone of that connection alive for the whole request.
	 *
	 * A single page load opened 46 connections, which exhausted MariaDB's
	 * max_connections (151) and made every request fail with
	 * "mysqli::real_connect(): (08004/1040): Too many connections".
	 *
	 * Resolving $CI here makes the reuse check work: the first call connects,
	 * every subsequent call reuses the one shared connection.
	 *
	 * @param	string	$params
	 * @param	bool	$return
	 * @param	bool	$query_builder
	 * @return	mixed
	 */
	public function database($params = '', $return = FALSE, $query_builder = NULL)
	{
		$CI =& get_instance();

		if ($return === FALSE && $query_builder === NULL && isset($CI->db) && is_object($CI->db) && ! empty($CI->db->conn_id))
		{
			// A connection is already open, so reuse it instead of opening another
			return FALSE;
		}

		return parent::database($params, $return, $query_builder);
	}
}
