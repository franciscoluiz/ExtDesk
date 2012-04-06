<?php
/**
 * Class to handle some file management functions
 * @author Paul Scott
 * @version 0.9
 * @package filemanager
 */
class filemanager
{
    /**
      * Recursive version of glob
      * @return array containing all pattern-matched files.
      * @param string $sDir      Directory to start with.
      * @param string $sPattern  Pattern to glob for.
      * @param int $nFlags      Flags sent to glob.
      */
    function globr($sDir, $sPattern, $nFlags = NULL)
    {
        $sDir = escapeshellcmd($sDir);
        // Get the list of all matching files currently in the
        // directory.
        $aFiles = glob("$sDir/$sPattern", $nFlags);
        // Then get a list of all directories in this directory, and
        // run ourselves on the resulting array.  This is the
        // recursion step, which will not execute if there are no
        // directories.
        foreach (@glob("$sDir/*", GLOB_ONLYDIR) as $sSubDir)
        {
            $aSubFiles = $this->globr($sSubDir, $sPattern, $nFlags);
            $aFiles = array_merge($aFiles, $aSubFiles);
        }
        // The array we return contains the files we found, and the
        // files all of our children found.
        return $aFiles;
    }//end function

    /**
     * Method to get the parent directory
     * @param void
     * @return the full path to the parent dir
     */
    function parentDir()
    {
        $parentDir = join(array_slice(split( "/" ,dirname($_SERVER['PHP_SELF'])),0,-1),"/").'/';
        return $parentDir;
    }

    /**
     * Method to change the mode of a file or directory
     * @param mixed $file
     * @param int $octal
     * @example $this->changeMode('/var/www/html/test.php',0777);
     * @return true on success
     */
    function changeMode($file,$octal)
    {
        chmod($file,$octal);
        return true;
    }

    /**
     * Method to perform a Recursive chmod
     * @param mixed $path
     * @param int $filemode
     * @return bool TRUE on success
     */
    function chmod_R($path, $filemode)
    {
        if (!is_dir($path))
        return chmod($path, $filemode);

        $dh = opendir($path);
        while ($file = readdir($dh))
        {
            if($file != '.' && $file != '..')
            {
                $fullpath = $path.'/'.$file;
                if(!is_dir($fullpath))
                {
                    if (!chmod($fullpath, $filemode))
                    return FALSE;
                }
                else
                {
                    if (!$this->chmod_R($fullpath, $filemode))
                    return FALSE;
                }
            }
        }

        closedir($dh);

        if(chmod($path, $filemode))
        return TRUE;
        else
        return FALSE;
    }

    /**
     * Methiod to convert UNIX style permissions (--rxwrxw) to an octal
     * @param mixed $mode
     * @return int $newmode
     */
    function chmodnum($mode)
    {
        $mode = str_pad($mode,9,'-');
        $trans = array('-'=>'0','r'=>'4','w'=>'2','x'=>'1');
        $mode = strtr($mode,$trans);
        $newmode = '';
        $newmode .= $mode[0]+$mode[1]+$mode[2];
        $newmode .= $mode[3]+$mode[4]+$mode[5];
        $newmode .= $mode[6]+$mode[7]+$mode[8];
        return $newmode;
    }

    /**
            * Method to recursively chown files
            * @param mixed $mypath
            * @param int $uid
            * @param int $gid
            * @return void
            */
    function recurse_chown_chgrp($mypath, $uid, $gid)
    {
        $d = opendir ($mypath) ;
        while(($file = readdir($d)) !== false)
        {
            if ($file != "." && $file != "..")
            {
                $typepath = $mypath . "/" . $file ;
                if (filetype ($typepath) == 'dir')
                {
                    $this->recurse_chown_chgrp ($typepath, $uid, $gid);
                }

                chown($typepath, $uid);
                chgrp($typepath, $gid);
            }
        }

    }

    /**
          * Copy a file, or recursively copy a folder and its contents
          * @author      Aidan Lister <aidan@php.net>
          * @author      Paul Scott
          * @version     1.0.1
          * @param       string   $source    Source path
          * @param       string   $dest      Destination path
          * @return      bool     Returns TRUE on success, FALSE on failure
          */
    function copyr($source, $dest)
    {
        // Simple copy for a file
        if (is_file($source))
        {
            return copy($source, $dest);
        }
        // Make destination directory
        if (!is_dir($dest))
        {
            mkdir($dest);
        }

        // Loop through the folder
        $dir = dir($source);
        while (false !== $entry = $dir->read())
        {
            // Skip pointers
            if ($entry == '.' || $entry == '..')
            {
                continue;
            }
            // Deep copy directories
            if ($dest !== "$source/$entry")
            {
                $this->copyr("$source/$entry", "$dest/$entry");
            }
        }
        // Clean up
        $dir->close();
        return true;
    }

    /**
     * Method to determine disk free space
     * NOTE: On UNIX like filesystems make sure that the param is given
     * @param string $drive
     * @return int $df
     */
    function df($drive = "C:")
    {
        if(PHP_OS=='WINNT' || PHP_OS=='WIN32')
        {
            $df = disk_free_space($drive);
        }
        else
        {
            $df = disk_free_space("/");
        }
        return $df;
    }

}//end class
?> 