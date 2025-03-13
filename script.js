$(document).ready(function() {
    $("#openModalButton").click(function() {
      $("#modalWindow").fadeIn(); 
      $("#modalOverlay").fadeIn();
    });
  
   
    $("#closeModalButton").click(function() {
      $("#modalWindow").fadeOut();
      $("#modalOverlay").fadeOut(); 
    });
  
  
    $("#modalOverlay").click(function() {
      $("#modalWindow").fadeOut();
      $("#modalOverlay").fadeOut();
    });

    let productCount = 0;
    const template = Handlebars.compile($('#product').html());

    $("#addProductButton").click(()=>{
      productCount++;
      const html = template({ number: productCount });
      $("#products").append(html);
    });

    // Функция для расчёта объёма одного товара
    function calculateVolume(product) {
      const productId = $(product).attr('id');
      const productNumber = productId.split('-')[1];
      const length = parseFloat($(`#length-${productNumber}`).val()) || 0;
      const width = parseFloat($(`#width-${productNumber}`).val()) || 0;
      const height = parseFloat($(`#height-${productNumber}`).val()) || 0;
      const volumeInput = parseFloat($(`#volume-${productNumber}`).val()) || 0;
        
      // Если объём введён вручную, используем его, иначе рассчитываем
      const result = length * width * height;
      console.log('Volume for product', productNumber, ':', result);
      return result;
    }

    // Функция для обновления общего объёма
  function updateTotalVolume() {
    let totalVolume = 0;
    $('.product').each(function() {
      totalVolume += calculateVolume(this);
    });
    $('#total-volume').val(totalVolume.toFixed(2));
  }
    // Обработчик изменения значений в полях ввода
  $('#products').on('input', '[id^="length-"], [id^="width-"], [id^="height-"]', function() {
    const product = $(this).closest('[id^="product-"]');
    console.log(product)
    if (!product.length) {
      console.error('Ошибка: не найден элемент с id, начинающимся на product-', this.id);
      return;
  }
    const volume = calculateVolume(product);
    const productNumber = product.attr('id').split('-')[1];
    $(`#volume-${productNumber}`).val(volume.toFixed(2));
    updateTotalVolume();
    
  });

  // Обработчик для ручного ввода объёма
  $('#products').on('input', '[id^="volume-"]', function() {
    console.log('Volume input triggered for:', this.id);
    const product = $(this).closest('[id^="product-"]');
    if (!product.length) {
      console.error('Ошибка: не найден элемент с id, начинающимся на product-', this.id);
      return;
  }
  updateTotalVolume(); // Пересчитываем общий объём
});

$('#products').on('click', '.product__remove-button', function() {
  const product = $(this).closest('[id^="product-"]');
  if (product.length) {
      product.remove();
      console.log('Товар удалён:', product.attr('id'));
      updateTotalVolume();
  } else {
      console.error('Ошибка: не найден элемент для удаления');
  }
});
  });

  /*
  Добавление товара:
    productCount++ — увеличивает счётчик.
    template({ number: productCount }) — рендерит шаблон с номером.
    $('#products').append(html) — добавляет в DOM.

  Пересчёт объёма:
    calculateVolume: length * width * height — вычисляет объём.
    updateTotalVolume: суммирует объёмы всех товаров.

  Удаление товара:
    $('.remove-product').on('click', ...) — обрабатывает клик.
    $(this).closest('[id^="product-"]').remove() — удаляет товар.

  Обновление полей:
    '#volume-${productNumber}').val(volume.toFixed(2)) — обновляет поле объёма.
  */