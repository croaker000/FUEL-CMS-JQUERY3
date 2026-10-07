<?php

/**
 * Formats a date
 * <pre>
 *  * value : the date, as a unix timestamp, mysql datetime or whatever strtotime() can parse
 *  * format : output format, see {@link http://php.net/strftime} for details
 *  * default : a default timestamp value, if the first one is empty
 * </pre>
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from the use of this software.
 *
 * @author     Jordi Boggiano <j.boggiano@seld.be>
 * @copyright  Copyright (c) 2008, Jordi Boggiano
 * @license    http://dwoo.org/LICENSE   Modified BSD License
 * @link       http://dwoo.org/
 * @version    1.0.1
 * @date       2008-12-24
 * @package    Dwoo
 */
function Dwoo_Plugin_date_format(Dwoo_Core $dwoo, $value, $format='%b %e, %Y', $default=null)
{
	if (!empty($value)) {
		// convert if it's not a valid unix timestamp
		if (preg_match('#^-?\d{1,10}$#', $value)===0) {
			$value = strtotime($value);
		}
	} elseif (!empty($default)) {
		// convert if it's not a valid unix timestamp
		if (preg_match('#^-?\d{1,10}$#', $default)===0) {
			$value = strtotime($default);
		} else {
			$value = $default;
		}
	} else {
		return '';
	}

	// Credits for that windows compat block to Monte Ohrt who made smarty's date_format plugin
	if (DIRECTORY_SEPARATOR == '\\') {
		$_win_from = array('%D',       '%h', '%n', '%r',          '%R',    '%t', '%T');
		$_win_to   = array('%m/%d/%y', '%b', "\n", '%I:%M:%S %p', '%H:%M', "\t", '%H:%M:%S');
		if (strpos($format, '%e') !== false) {
			$_win_from[] = '%e';
			$_win_to[]   = sprintf('%\' 2d', date('j', $value));
		}
		if (strpos($format, '%l') !== false) {
			$_win_from[] = '%l';
			$_win_to[]   = sprintf('%\' 2d', date('h', $value));
		}
		$format = str_replace($_win_from, $_win_to, $format);
	}
	return _dwoo_strftime_format($format, $value);
}

if (!function_exists('_dwoo_strftime_format')) {
	function _dwoo_strftime_format($format, $value)
	{
		if (class_exists('\IntlDateFormatter')) {
			try {
				$locale = setlocale(LC_TIME, 0);
				$formatter = new \IntlDateFormatter(
					($locale === false || $locale === '') ? null : (string) $locale,
					\IntlDateFormatter::NONE,
					\IntlDateFormatter::NONE,
					null,
					null,
					_dwoo_strftime_to_icu($format)
				);
				return $formatter->format($value);
			} catch (\Exception $e) {
				// fall through to the date()-based approximation
			}
		}
		return date(_dwoo_strftime_to_date($format), $value);
	}
}

if (!function_exists('_dwoo_strftime_to_icu')) {
	function _dwoo_strftime_to_icu($format)
	{
		$map = array(
			'%a' => 'EEE',        '%A' => 'EEEE',      '%b' => 'MMM',       '%B' => 'MMMM',
			'%c' => 'EEE MMM d HH:mm:ss y', '%C' => 'yy',  '%d' => 'dd',       '%D' => 'MM/dd/yy',
			'%e' => 'd',          '%F' => 'yyyy-MM-dd', '%g' => 'yy',        '%G' => 'yyyy',
			'%h' => 'MMM',        '%H' => 'HH',        '%I' => 'hh',         '%j' => 'DDD',
			'%k' => 'H',          '%l' => 'h',         '%m' => 'MM',         '%M' => 'mm',
			'%n' => "'\n'",       '%p' => 'a',         '%P' => 'a',          '%r' => 'hh:mm:ss a',
			'%R' => 'HH:mm',      '%s' => 'U',         '%S' => 'ss',         '%t' => "'\t'",
			'%T' => 'HH:mm:ss',   '%u' => 'e',         '%U' => 'w',          '%v' => 'd-MMM-yyyy',
			'%V' => 'w',          '%w' => 'e',         '%W' => 'w',          '%x' => 'y-MM-dd',
			'%X' => 'HH:mm:ss',   '%y' => 'yy',        '%Y' => 'yyyy',       '%z' => 'Z',
			'%Z' => 'zzzz',
		);

		$result = '';
		$literal = '';
		$length = strlen($format);
		for ($i = 0; $i < $length; $i++) {
			$char = $format[$i];
			if ($char === '%' && $i + 1 < $length) {
				$token = '%' . $format[$i + 1];
				if ($token === '%%') {
					$literal .= '%';
				} elseif (isset($map[$token])) {
					if ($literal !== '') {
						$result .= "'" . str_replace("'", "''", $literal) . "'";
						$literal = '';
					}
					$result .= $map[$token];
				} else {
					// Unknown tokens are kept as literal text
					$literal .= $token;
				}
				$i++;
			} else {
				$literal .= $char;
			}
		}
		if ($literal !== '') {
			$result .= "'" . str_replace("'", "''", $literal) . "'";
		}

		return $result;
	}
}

if (!function_exists('_dwoo_strftime_to_date')) {
	function _dwoo_strftime_to_date($format)
	{
		$map = array(
			'%a' => 'D',          '%A' => 'l',          '%b' => 'M',          '%B' => 'F',
			'%c' => 'D M j H:i:s Y', '%C' => 'y',       '%d' => 'd',          '%D' => 'm/d/y',
			'%e' => 'j',          '%F' => 'Y-m-d',      '%g' => 'y',          '%G' => 'Y',
			'%h' => 'M',          '%H' => 'H',          '%I' => 'h',          '%j' => 'z',
			'%k' => 'G',          '%l' => 'g',          '%m' => 'm',          '%M' => 'i',
			'%n' => "\n",         '%p' => 'A',          '%P' => 'a',          '%r' => 'h:i:s A',
			'%R' => 'H:i',        '%s' => 'U',          '%S' => 's',          '%t' => "\t",
			'%T' => 'H:i:s',      '%u' => 'N',          '%U' => 'W',          '%v' => 'j-M-Y',
			'%V' => 'W',          '%w' => 'w',          '%W' => 'W',          '%x' => 'Y-m-d',
			'%X' => 'H:i:s',      '%y' => 'y',          '%Y' => 'Y',          '%z' => 'O',
			'%Z' => 'T',
		);

		$result = '';
		$literal = '';
		$length = strlen($format);
		for ($i = 0; $i < $length; $i++) {
			$char = $format[$i];
			if ($char === '%' && $i + 1 < $length) {
				$token = '%' . $format[$i + 1];
				if ($token === '%%') {
					$literal .= '%';
				} elseif (isset($map[$token])) {
					if ($literal !== '') {
						$result .= _dwoo_escape_date_literal($literal);
						$literal = '';
					}
					$result .= $map[$token];
				} else {
					// Unknown tokens are kept as literal text
					$literal .= $token;
				}
				$i++;
			} else {
				$literal .= $char;
			}
		}
		if ($literal !== '') {
			$result .= _dwoo_escape_date_literal($literal);
		}

		return $result;
	}
}

if (!function_exists('_dwoo_escape_date_literal')) {
	function _dwoo_escape_date_literal($literal)
	{
		$out = '';
		$len = strlen($literal);
		for ($i = 0; $i < $len; $i++) {
			$out .= '\\' . $literal[$i];
		}
		return $out;
	}
}
