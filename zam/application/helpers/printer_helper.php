<?php
date_default_timezone_set('Asia/Ulaanbaatar');
require 'autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;

function printer($data) {
    

    /* Open the printer; this will change depending on how it is connected */
    $connector = new FilePrintConnector("POS58");
    $printer = new Printer($connector);

    /* Information for the receipt */
    $items = array(
        new item("Example item #1", "4.00"),
        new item("Another thing", "3.50"),
        new item("Something else", "1.00"),
        new item("A final item", "4.45"),
    );
    $sum = 0;
    foreach ($data as $dat) {
        $sum = $sum + $dat['count']*$dat['price'];
    }
    $subtotal = new item('Subtotal', $sum);
    $tax = new item('NUAT', 100);
    $total = new item('Total', ($sum+100), true);
    /* Date is kept the same for testing */
    // $date = date('l jS \of F Y h:i:s A');
    $date = date('Y-m-d H:i:s');

    /* Start the printer */
    //$logo = EscposImage::load("resources/escpos-php.png", false);
    $printer = new Printer($connector);

    /* Print top logo */
    $printer -> setJustification(Printer::JUSTIFY_CENTER);
    //$printer -> graphics($logo);

    /* Name of shop */
    $printer -> selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
    $printer -> text("Mirage Restaurant.\n");
    $printer -> selectPrintMode();
    $printer -> text("Room Karaoke.\n");
    $printer -> feed();

    /* Title of receipt */
    $printer -> setEmphasis(true);
    $printer -> text("SALES INVOICE\n");
    $printer -> setEmphasis(false);

    /* Items */
    $printer -> setJustification(Printer::JUSTIFY_LEFT);
    $printer -> setEmphasis(true);
    $printer -> text(new item('', '₮'));
    $printer -> setEmphasis(false);
    foreach ($data as $item) {
        $printer -> text(new item($item['name'], $item['price']));
    }
    $printer -> setEmphasis(true);
    $printer -> text($subtotal);
    $printer -> setEmphasis(false);
    $printer -> feed();

    /* Tax and total */
    $printer -> text($tax);
    $printer -> selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
    $printer -> text($total);
    $printer -> selectPrintMode();

    /* Footer */
    $printer -> feed(2);
    $printer -> setJustification(Printer::JUSTIFY_CENTER);
    $printer -> text("Thank you for shopping at Mirage Restaurant\n");
    $printer -> text("For trading hours, please visit FB\n");
    $printer -> feed(2);
    $printer -> text($date . "\n");

    /* Cut the receipt and open the cash drawer */
    $printer -> cut();
    $printer -> pulse();

    $printer -> close();
}

/* A wrapper to do organise item names & prices into columns */
class item
{
    private $name;
    private $price;
    private $dollarSign;

    public function __construct($name = '', $price = '', $dollarSign = false)
    {
        $this -> name = $name;
        $this -> price = $price;
        $this -> dollarSign = $dollarSign;
    }

    public function __toString()
    {
        $rightCols = 10;
        $leftCols = 38;
        if ($this -> dollarSign) {
            $leftCols = $leftCols / 2 - $rightCols / 2;
        }
        $left = str_pad($this -> name, $leftCols) ;

        $sign = ($this -> dollarSign ? '$ ' : '');
        $right = str_pad($sign . $this -> price, $rightCols, ' ', STR_PAD_LEFT);
        return "$left$right\n";
    }
}
