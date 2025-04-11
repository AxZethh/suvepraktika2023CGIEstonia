package com.cgi.library.model;

public enum BookStatus {

    AVAILABLE, //book is available to be borrowed
    BORROWED, //book has been checked out
    RETURNED, //book has been returned but is not yet available to be checked out again
    DAMAGED, //book has been damaged and is waiting to be repaired
    PROCESSING //book is in the process of being registered in the system / repaired
}
