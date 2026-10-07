<?php

/**
 * -------------------------------------------------------------------------
 * CodeIgniter 3 IDE Helper for Intelephense
 * -------------------------------------------------------------------------
 * This file is purely for IDE autocomplete. It is never executed.
 */

/**
 * @method array result_assoc_array(string $key)
 * @method array result_assoc(string $key)
 */
class CI_DB_result {}

/**
 * @method void module_language(string $module, string $langfile, string $idiom = '', bool $return = FALSE, bool $add_suffix = TRUE, string $alt_path = '')
 * @method void module_model(string $module, string $model, string $object_name = NULL)
 * @method string|void module_view(string $module, string $view, array $vars = [], bool $return = FALSE)
 */
class CI_Loader {}

class CI_Controller {
    /** @var CI_Loader */
    public $load;
    /** @var CI_DB_query_builder */
    public $db;
    /** @var CI_Input */
    public $input;
    /** @var CI_Session */
    public $session;

    // --- Add your custom application models and libraries here ---
    /** @var User_model */
    public $User_model;
    /** @var Auth_library */
    public $auth_library;
}

class CI_Model {
    /** @var CI_DB_query_builder */
    protected $db;
    /** @var CI_Loader */
    protected $load;
    /** @var CI_Input */
    protected $input;
    /** @var CI_Session */
    protected $session;
    /** @var CI_URI */
    protected $uri;
    /** @var CI_Security */
    protected $security;
}

/**
 * -------------------------------------------------------------------------
 * Custom DB driver methods (MY_DB_mysqli_driver / MY_DB_mysql_driver)
 * -------------------------------------------------------------------------
 */

/**
 * @method string safe_select($table, $fields = NULL, $prefix = NULL)
 * @method string field_info($table, $field)
 * @method array table_info($table, $set_field_key = TRUE)
 * @method bool has_select()
 * @method mixed insert_ignore($table, $values, $primary_key = 'id')
 * @method void debug_query($hidden = FALSE, $exit = FALSE, $return = FALSE)
 * @method int|string insert_id($name = NULL)
 * @method void load_sql(string $sql, bool $is_path = TRUE)
 */
class CI_DB_query_builder extends CI_DB_driver {}

/**
 * -------------------------------------------------------------------------
 * Custom DB Result Methods (MY_DB_mysqli_result / MY_DB_mysql_result)
 * -------------------------------------------------------------------------
 */

/**
 * @method array result_assoc_array(string $key)
 * @method array result_assoc(string $key)
 */
class CI_DB_mysqli_result {}

/**
 * @method array result_assoc_array(string $key)
 * @method array result_assoc(string $key)
 */
class CI_DB_mysql_result {}

/**
 * -------------------------------------------------------------------------
 * CodeIgniter 4 IDE Helper for Intelephense
 * -------------------------------------------------------------------------
 */

// namespace CodeIgniter;

// class Controller {
//     /** @var \CodeIgniter\HTTP\IncomingRequest */
//     protected $request;
//     /** @var \CodeIgniter\HTTP\Response */
//     protected $response;
//     /** @var \CodeIgniter\Validation\Validation */
//     protected $validator;
// }
