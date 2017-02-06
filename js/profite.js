var tagEject = false,
    getDataDisableBuy = '';
$(window).load(function() {
    if ($('body').hasClass('categoria') || $('body').hasClass('search') || $('body').hasClass('home')) {
        setDisplayMetraje();
    }
    if ($('body').hasClass('produto')) {
        responsive_resize();
    }
});
$(window).resize(function() {
    responsive_resize();
});
$(document).ajaxStop(function() {
    fnTags();
    if ($('body').hasClass('produto')) {
        if ($('.col-2 .modulo.info .flag-wrapper p.showmetraje').length) {
            var getMetrajeHtml = ($('table.Ficha-Tecnica th.Caja-rinde').html()).toUpperCase();
            if (getMetrajeHtml.indexOf("CAJA") !== -1) {
                if ($('.col-2 .modulo.info .flag-wrapper p[class*="tarjeta-oh"]').length) {
                    var getpriceCajOh = parseFloat(($('.modulo.promo-oh .price-oh-wrapper .price-oh').text().split('S/'))[1]),
                        setPriceMjeOh = ((getpriceCajOh) / showMetraje).toFixed(2);
                    $('.modulo.promo-oh .price-oh-wrapper .price-oh').text('S/ ' + setPriceMjeOh);
                    $('.product-stick .promo-price .price').text('S/ ' + setPriceMjeOh);
                }
            }
        }
        if ($('.col-2 .modulo.info .no-disponible').is(':visible')) {
            $('.product-stick .content-prod-stick .button-buy').hide();
        }
        if ($('.col-2 .modulo.info .disponibilidad').length) {
            $('div.no-disponible').attr('style', 'display:none !important');
        }
    }
});
$(function() {
    getDataDisableBuy = getDataDisableBuyButton();
    if (!tagEject) {
        fnTags();
    }
    $('.bread-crumb li').each(function() {
        var cBreadcrumb = $(this).find('a').text();
        $(this).find('a').addClass(cBreadcrumb);
    });
    if ($('.value-field.Video').length) {
        $('#caracteristicas table tbody').prepend('<tr class="a"></tr><tr class="b"></tr><tr class="c"></tr>');
    };
    $('.btnSel .selectSel .opt.a').click(function() {
        $('.btnSel .selectSel .group').toggle();
    });
    $('.btnSel .selectSel .group a').click(function() {
        $('.btnSel .selectSel .group').hide();
        var valor = $(this).html();
        $('.btnSel .selectSel div.opt.a').html(valor);
        $('.wrap-items .items').hide();
        var activeTab = $(this).attr('href');
        $(activeTab).show();
        $('.wrap-items .items').each(function() {
            if ($(this).css('display') == "block") {
                $('.wrap-items .items .item').each(function() {
                    var dataCatalogo = $(this).attr('data-mame');
                    console.log('dataCatalogo ' + dataCatalogo);
                });
            }
        });
        return false;
    });
    $('.btnSel .selectSel .group').mouseleave(function() {
        $(this).hide();
    });
    if ($('body').hasClass('produto')) {
        if ($('.flag.preciazo').length) {
            $('.flag.home-carrusel-exclusivas-online').remove();
        } else {
            $('.precio p.flag.home-carrusel-exclusivas-online').show();
        }
        $('.detalle-producto .col-1').append('<a href="#" class="download-pdf" style="float: right; margin-right: 10px; margin-top: 1px;"><img src="/arquivos/ico_pdf4.png"></a>');
        downloadPdf();
        disableBuy();
    }
    if ($('body').hasClass('produto')) {
        if ($('.col-2 .modulo.info .flag-wrapper p.showmetraje').length) {
            if ($('.skuBestPrice').length) {
                var integer = /^-?[0-9]+$/,
                    getMetrajeHtml = ($('table.Ficha-Tecnica th.Caja-rinde').html()).toUpperCase();
                if (getMetrajeHtml.indexOf("CAJA") !== -1) {
                    var getNumberMetraje = $('table.Ficha-Tecnica td.Caja-rinde:eq(0)').text(),
                        cstNumMetraje = getNumberMetraje,
                        result = 0,
                        setNumberCajas = 0,
                        getPriceCaj = parseFloat((($('.skuBestPrice').text().split('S/'))[1]).replace(",", ".")),
                        adicionalTF = false;
                    getNumberMetraje = parseFloat(Number(getNumberMetraje).toFixed(2));
                    var showMetraje = getNumberMetraje,
                        setPriceMje = ((getPriceCaj) / showMetraje).toFixed(2);
                    $('.descricao-preco').prepend('<em class="valor-por price-best-price metrajePrecio" style="display: block; font-size: 12px; font-style: normal;"> Precio por mÂ²: </em>').prepend('<em class="valor-por price-best-price metrajeCaja" style="display: block; font-size: 13px; margin-bottom:10px; font-style: normal;"> Precio por caja: S/. ' + getPriceCaj + '</em>').addClass('descripcion-metraje');
                    $('.skuBestPrice').html('S/ ' + setPriceMje);
                    $('.modulo.info .opciones.row .cantidad').hide();
                    setHtml();

                    function setHtml() {
                        var htmlTemplate = '<div class="modulo cantidad metraje vcenter" style="margin-bottom: 20px; margin-right: 90px;">';
                        htmlTemplate += '<div class="cantidad spinner-1 vcenter" style="width: 120px; margin-right: 15px;">';
                        htmlTemplate += '<input class="spinner" type="text" value="' + getNumberMetraje.toFixed(2) + '" id="txtNumMetraje" style="width: 55px;">';
                        htmlTemplate += '<div class="rightM" style="display: inline-block; margin-top: 15px; margin-right: 8px; vertical-align: top;"><span style="height: 20px; line-height: 20px;">mÂ²</span></div>';
                        htmlTemplate += '<div class="arrows">';
                        htmlTemplate += '<div class="up" id="upAcc"></div>';
                        htmlTemplate += '<div class="down" id="downAcc"></div>';
                        htmlTemplate += '</div>';
                        htmlTemplate += '</div>';
                        htmlTemplate += '<h4 class="titulo vcenter" id="numCajas" style="color: #fe9424;"><span style="font-size: 30px;">1 </span> Caja</h4>';
                        htmlTemplate += '</div>';
                        htmlTemplate += '<div class="modulo adicional vcenter" style="clear: both; display: block; margin: 15px 0; width: 100%; font-size: 14px;"><input type="checkbox" name="adicional" value="10"> Se prevenido, <strong>aÃ±ade un 10%</strong> <a class="tool" data-tooltip="AÃ±adir 10% para zÃ³calos, perdidas y rupturas">?</a></div>';
                        $('.modulo.info .opciones .row .modulo.cantidad').after(htmlTemplate);
                        $("#upAcc").unbind('click').bind('click', upMetraje);
                        $("#downAcc").unbind('click').bind('click', downMetraje);
                        setInputMetraje();
                        adicional();
                    }

                    function upMetraje() {
                        showMetraje = showMetraje + getNumberMetraje;
                        setCajas(true);
                        return false;
                    }

                    function downMetraje() {
                        if (showMetraje > getNumberMetraje) {
                            showMetraje = showMetraje - getNumberMetraje;
                            setCajas(true);
                        }
                        return false;
                    }

                    function setCajas(UpDown, removeAdc) {
                        if (integer.test(showMetraje)) {
                            showMetraje = parseInt(showMetraje);
                        } else {
                            showMetraje = parseFloat(Number(showMetraje).toFixed(2));
                        }
                        if (!removeAdc) {
                            result = (Math.round(showMetraje * 100) / 100);
                            setNumberCajas = result / getNumberMetraje;
                            if (integer.test(setNumberCajas)) {
                                setNumberCajas = setNumberCajas;
                            } else {
                                var splitNmCajs = setNumberCajas.toFixed(3).split('.');
                                if (parseInt(splitNmCajs[1]) > 0) {
                                    setNumberCajas = parseInt(setNumberCajas) + 1;
                                } else {
                                    setNumberCajas = parseInt(setNumberCajas);
                                }
                            }
                        }
                        if (removeAdc) {
                            result = result / 1.1;
                            setNumberCajas = (result / getNumberMetraje);
                            $("#txtNumMetraje").val((result.toFixed(2)));
                        } else {
                            if ((adicionalTF && UpDown) || (adicionalTF)) {
                                result = result * 1.1;
                                setNumberCajas = (result / getNumberMetraje);
                                $("#txtNumMetraje").val((result.toFixed(2)));
                            } else if (UpDown) {
                                $("#txtNumMetraje").val((result.toFixed(2)));
                            }
                        }
                        var splitNmCajs = setNumberCajas.toFixed(3).split('.');
                        setNumberCajas = parseInt(splitNmCajs[1]) > 0 ? parseInt(setNumberCajas) + 1 : Math.round(setNumberCajas);
                        var txtNumberCajas = setNumberCajas == 1 ? 'Caja' : 'Cajas',
                            htmlSetNumCajas = '<span style="font-size: 30px;">' + setNumberCajas + '</span> ' + txtNumberCajas;
                        $('.detalle-producto .cantidad:eq(0) input').val(setNumberCajas);
                        $("#numCajas").html(htmlSetNumCajas);
                    }

                    function setInputMetraje() {
                        $('#txtNumMetraje').bind('blur', function(e) {
                            if ($(this).val() > 0) {
                                showMetraje = $(this).val();
                                setCajas(false);
                            } else {
                                alert('Ingresar un numero mayor');
                            }
                        }).keypress(function(e) {
                            if (e.which == 13) {
                                showMetraje = $(this).val();
                                setCajas(false);
                            }
                        });
                    }

                    function adicional() {
                        $('input[name=adicional]').bind('change', function() {
                            if ($(this).is(':checked'))
                                adicionalTF = true, setCajas(false);
                            else
                                adicionalTF = false, setCajas(false, true);
                        });
                        $('input#txtNumMetraje').keydown(function(e) {
                            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
                                return;
                            }
                            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        }
    }
    if ($('body').hasClass('categoria') || $('body').hasClass('search')) {
        $.each($('.list-prods ul li').not('.list-prods ul li.helperComplement'), function(e, element) {
            var $this = $(element);
            if (($this.find('.product .flag-wrapper [class*="exclusivas-online"]').length) > 1) {
                $this.find('.product .flag-wrapper [class*="exclusivas-online"]:eq(1)').hide();
            }
        });
    }
    $('.pagina.listado.categoria .imagen h2:contains("Cocinas y Banos")').each(function() {
        $(this).text('Cocinas y BaÃ±os');
    });
    if ($('body').hasClass('especial')) {
        $('.category-filter').unbind('click').bind('click', function(e) {
            $(this).next().slideToggle();
        });
    }
    if ($('body').hasClass('home')) {
        $('.slider .box-banner img[src*="212744"], .slider .box-banner img[src*="213454"]').parent().attr('target', '_blank');
        $.each($('.bx-wrapper ul li').not('.bx-wrapper ul li.helperComplement'), function(e, element) {
            var $this = $(element);
            if (($this.find('.product .flag-wrapper [class*="exclusivas-online"]').length) > 1) {
                $this.find('.product .flag-wrapper [class*="exclusivas-online"]:eq(1)').hide();
            }
        });
    }
});

function downloadPdf() {
    $('.download-pdf').unbind('click').bind('click', function(e) {
        var pathname = window.location.pathname; /*var getUrl='http://tools.promart.pe/generador-pdf/?url_page='+pathname*/
        var getUrl = 'http://tools.promart.pe/generator-pdf_v2/?url_page=' + pathname;
        $.fileDownload(getUrl, {
            successCallback: function(url) {
                console.log('You just got a file download dialog or ribbon for this URL :' + url);
            },
            failCallback: function(html, url) {
                console.log('Your file download just failed for this URL:' + url + '\r\n' + 'Here was the resulting error HTML: \r\n' + html);
            }
        });
        e.preventDefault();
    });
}

function fnTags() {
    $.each($(".list-prods .list-prods.n1colunas li, .bx-wrapper .bx-viewport li").not('.list-prods .list-prods.n1colunas li.helperComplement, .list-prods .list-prods.n1colunas ul.insert-sku-checklist li, .bx-wrapper .bx-viewport li.helperComplement'), function(a, e) {
        var i = $(e),
            getSku = $(i).find('.detalle .sku').text();
        if ($(i).find(".flag-wrapper .tarjeta-oh").length) {
            i.find('.flag-wrapper .linea-blanca-tag').remove();
            i.find('.flag-wrapper .preciazo').remove();
        } else {
            if ($(i).find(".flag-wrapper div.linea-blanca-tag").length || $(i).find(".flag-wrapper .tarjeta-oh").length) {
                return;
            } else {
                var r = i.find(".has-best-price").find(".listPrice").text().substring(3),
                    l = Number(r.replace(/[^0-9\.-]+/g, "")),
                    n = i.find(".has-best-price").find(".bestPrice").text().substring(3),
                    t = Number(n.replace(/[^0-9\.-]+/g, ""));
                if (r != "") {
                    var ahorro = l - t;
                    ahorro = ((ahorro * 100) / l).toFixed(0), i.find("[class*=flag-wrapper]").append('<div class="flag linea-blanca-tag" style="display: block;"><p>Ahorra<span>' + ahorro + "%</span></p></div>")
                }
            }
        }
        if ($(i).find(".flag-wrapper .preciazo").length) {
            i.find('.flag-wrapper .home-carrusel-exclusivas-online').remove();
            i.find('.flag-wrapper .exclusivas-online').remove();
        }
        getSku = $.trim(getSku.split('SKU:')[1]);
        $.each(getDataDisableBuy, function(rowI, idSku) {
            if (idSku == getSku) {
                disableBuyDepCat(i);
            }
        });
    })
}

function setDisplayMetraje() {
    $.each($('.list-prods ul li').not('.list-prods ul li.helperComplement'), function(e, element) {
        var $this = $(element),
            getSku = ($this.find('.detalle .sku').text().split('SKU: '))[1];
        if ($this.find('.product .flag.showmetraje').length) {
            if ($this.find('.precio .best-price-wrapper .bestPrice').length) {
                var getName = ($this.find('.getNumberMetraje').text()).toUpperCase();
                if (getName.indexOf("CAJA") !== -1) {
                    var getNumberMetraje = $this.find('.getNumberMetraje ul li').text(),
                        cstNumMetraje = getNumberMetraje,
                        result = 0,
                        setNumberCajas = 0,
                        getPriceCaj = parseFloat((($this.find('.precio .best-price-wrapper .bestPrice').text().split('S/'))[1]).replace(",", ".")),
                        getNumberMetraje = parseFloat(getNumberMetraje),
                        setPriceMjeR = ((getPriceCaj) / getNumberMetraje).toFixed(2),
                        getFlagMetraje = '';
                    if ($this.find('.detalle .no-best-price').length) {
                        $this.find('.precio .listPrice.invisible').remove();
                        if ($this.find('.product .flag.tarjeta-oh').length) {
                            var getPriceCajO = parseFloat(($this.find('.precio .best-price-wrapper .tarjeta-oh-price').text().split('S/'))[1]),
                                setPriceMjeRO = ((getPriceCajO) / getNumberMetraje).toFixed(2);
                            $this.find('.precio .best-price-wrapper .price-case').html('Precio por caja: <span>S/. ' + getPriceCaj + '</span>').show();
                            $this.find('.precio .best-price-wrapper .price-m2').html('Precio por M2:').show();
                            $this.find('.precio .best-price-wrapper .bestPrice').html('<span class="p-t"></span> S/. ' + setPriceMjeR);
                            $this.find('.precio .best-price-wrapper .tarjeta-oh-price').html('S/. ' + setPriceMjeRO);
                        } else {
                            $this.find('.precio .best-price-wrapper .price-case').html('Precio por caja: <span>S/. ' + getPriceCaj + '</span>').show();
                            $this.find('.precio .best-price-wrapper .price-m2').html('Precio por M2:').show();
                            $this.find('.precio .best-price-wrapper .bestPrice').html('<span class="p-t"></span> S/. ' + setPriceMjeR);
                        }
                    }
                    if ($this.find('.detalle .has-best-price').length) {
                        $this.find('.precio .listPrice').remove();
                        var getPriceCajP = parseFloat(($this.find('.detalle .has-best-price .best-price-wrapper .bestPrice').text().split('S/'))[1]),
                            setPriceMjeRP = ((getPriceCajP) / getNumberMetraje).toFixed(2);
                        $this.find('.precio .best-price-wrapper .price-case').html('Precio por caja: <span>S/. ' + getPriceCaj + '</span>').show();
                        $this.find('.precio .best-price-wrapper .price-m2').html('Precio por M2:').show();
                        $this.find('.precio .best-price-wrapper .bestPrice').html('<span class="p-t"></span> S/. ' + setPriceMjeR).css({
                            'color': '#565656'
                        });
                        $this.find('.precio .best-price-wrapper .sep').css({
                            'display': 'inline-block'
                        });
                        $this.find('.precio .best-price-wrapper .tarjeta-oh-price').text('S/. ' + setPriceMjeRP).css({
                            'display': 'inline-block',
                            'color': '#fe9424'
                        });
                    }
                    $this.addClass('LiMetraje');
                }
            }
        }
    });
}

function disableBuyDepCat(tag) {
    $(tag).find(".add-to-cart span").text('Ver Detalle');
    $(tag).find(".add-to-cart").click(function(e) {
        e.stopPropagation();
    });
}

function getDataDisableBuyButton() {
    $.ajax({
        type: 'GET',
        url: 'http://api.vtexcrm.com.br/promart/dataentities/TG/search/?_fields=id,tgTag,tgSku&_where=tgTag=disablebtnbuy',
        dataType: 'json',
        async: false,
        success: function(productFound) {
            setDisableBuyButton = productFound[productFound.length - 1].tgSku;
        }
    });
    return setDisableBuyButton;
}

function disableBuy() {
    var getSku = $('.detalle-producto .skuReference').text();
    $.each(getDataDisableBuy, function(rowI, idSku) {
        if (idSku == getSku) {
            $('.modulo.info').find('.modulo.opciones').hide();
            $('.content-prod-stick').find('.button-buy').hide();
            var activosPromart = [],
                getDistrito, getDisponible, getDistritoActivo = function(distrito, disponible) {
                    return {
                        distrito: distrito,
                        tf: disponible
                    }
                },
                promartDirecciones = [{
                    name: 'BreÃ±a',
                    distrito: 'Promart - BreÃ±a',
                    direccion: 'Calle Huaraz 1561, BreÃ±a',
                    referencia: 'C.C La Rambla BreÃ±a',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }, {
                    name: 'Salaverry',
                    distrito: 'Promart - Salaverry',
                    direccion: 'Av. Salaverry, cuadra 24, JesÃºs MarÃ­a',
                    referencia: 'C.C Real Plaza Salaverry',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }, {
                    name: 'Santa Clara',
                    distrito: 'Promart - Santa Clara',
                    direccion: 'Carretera Central Km. 10.5 Santa Clara, Ate',
                    referencia: 'C.C Real Plaza Santa Clara',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }, {
                    name: 'Ate',
                    distrito: 'Promart - Ate',
                    direccion: 'Av La Molina Cdra. 3, Ate',
                    referencia: '',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }, {
                    name: 'Pro',
                    distrito: 'Promart - Pro',
                    direccion: 'Av. Alfredo Mendiola 7026, San Martin de Porres',
                    referencia: 'C.C Real Plaza Pro',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }, {
                    name: 'Chorrillos',
                    distrito: 'Promart - Chorrillos',
                    direccion: 'Av. Guardia Civil 927 Urb. La CampiÃ±a, Chorrillos',
                    referencia: 'C.C Real Plaza Chorrillos',
                    horario: 'Lunes a sÃ¡bado de 8.30 am a 10pm (Ingreso al Ã¡rea de materiales desde las 7.30 am) Domingos y feriados de 8.30 am a 10pm.'
                }],
                showHtml = '';
            $('.Ficha-Tecnica tr').each(function(index, el) {
                if ($(this).find('th').is('[class*="distritoTF"]')) {
                    getDistrito = (($(this).find('th').text()).split('distritoTF '))[1];
                    getDisponible = $(this).find('td').text();
                    activosPromart.push(getDistritoActivo(getDistrito, getDisponible));
                }
            });

            function distritoExistTF(distrito) {
                for (var i = 0; i < activosPromart.length; i++) {
                    if (activosPromart[i].distrito == distrito) {
                        return true;
                    }
                }
            }
            $.each(promartDirecciones, function(i, v) {
                var existDistrito = distritoExistTF(v.name);
                showHtml += '<div class="item">';
                showHtml += '<div class="left">';
                showHtml += ' <h3>' + v.distrito + '</h3>';
                showHtml += ' <div class="dir">';
                showHtml += '   <p>' + v.direccion + '</p>';
                showHtml += '   <p>' + v.referencia + '</p>';
                showHtml += ' </div>';
                showHtml += ' <p>';
                showHtml += v.horario;
                showHtml += ' </p>';
                showHtml += ' <div class="target">';
                showHtml += '   <div class="icon"></div>';
                showHtml += ' </div>';
                showHtml += '</div>';
                showHtml += '<div class="right">';
                if (distritoExistTF(v.name)) {
                    showHtml += '<div class="btnTrue">Disponible</div>';
                } else {
                    showHtml += '<div class="btnFalse">No Disponible</div>';
                }
                showHtml += '</div>';
                showHtml += '<div class="clearfix"></div>';
                showHtml += '</div>';
            });
            $(".disponible-tienda .content .contentInfo .contentScroll").html(showHtml);
            var htmlCobProvincia = '<select><option value="--">Promat Lima</option></select>';
            $('.contentCbo .inputCbo').append(htmlCobProvincia);
            var htmlBtnDsp = '<div class="modulo disponibilidad row">';
            htmlBtnDsp += '<div class="row">';
            htmlBtnDsp += '<p>Producto de venta exclusiva en nuestras tiendas fÃ­sicas. Revisa aquÃ­ su disponibilidad.</p>';
            htmlBtnDsp += '<a class="btn btn-5 vcenter btnDisponibleDistrito" href="#">VER DISPONIBILIDAD</a>';
            htmlBtnDsp += '</div>';
            htmlBtnDsp += '</div>';
            $(".modulo.info.row .modulo:eq(1)").after(htmlBtnDsp);
            $('.btnDisponibleDistrito').unbind('click').bind('click', function(e) {
                $(".disponible-tienda").addClass('active');
                e.preventDefault();
            });
            $('table.Ficha-Tecnica tr').each(function(index, el) {
                if ($(this).find('th').is('[class*="distritoTF"]')) {
                    $(this).remove();
                }
            });
        }
    });
}

function responsive_resize() {
    var current_width = $(window).width();
    if (current_width <= 760) {
        if ($('.value-field.Video').length) {
            var getContenVideo = $('.value-field.Video').html(),
                srcVideo = (getContenVideo.split(','))[0],
                txtVideo = (getContenVideo.split(','))[1];
            $('.modulo.caracteristicas #detalle-tabs li:eq(1)').removeClass('hidden');
            $('.modulo.caracteristicas #detalle-tabs li:eq(1) .res-mobile').html('<div style="display: block; margin: 15px; width: 80%; text-align: center;">' + txtVideo + '</div><iframe width="100%" height="180" src="' + srcVideo + '" frameborder="0" allowfullscreen="" allowtransparency="true"></iframe>');
        }
    }
    if (current_width > 760) {
        if ($('.value-field.Video').length) {
            $('.value-field.Video').each(function() {
                $('.ui-tabs-nav li').eq(1).removeClass('hidden');
                var srcVideo = (($(this).text()).split(','))[0],
                    txtVideo = (($(this).text()).split(','))[1];
                $('.ui-tabs .ui-tabs-panel').eq(1).removeClass('hidden').append('<div style="display: block; margin: 15px; width: 100%; text-align: center;">' + txtVideo + '</div><iframe width="80%" height="410" src="' + srcVideo + '" frameborder="0" allowfullscreen="" allowtransparency="true"></iframe>');
            });
            $('.value-field.Video').parent().remove();
            $('tr.c').remove();
        };
    }
}

function disableLinks() {
    var t = {
        departamentos: [{
            contenHtml: ".cusco .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/cusco/"
        }, {
            contenHtml: ".huanuco .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/huanuco/"
        }, {
            contenHtml: ".cajamarca .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/cajamarca/"
        }, {
            contenHtml: ".huancayo .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/huancayo/"
        }, {
            contenHtml: ".moquegua .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/moquegua/"
        }, {
            contenHtml: ".juliaca .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/juliaca/"
        }, {
            contenHtml: ".pisco .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/pisco/"
        }, {
            contenHtml: ".piura .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/piura/"
        }, {
            contenHtml: ".sullana .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/sullana/"
        }, {
            contenHtml: ".talara .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/talara/"
        }, {
            contenHtml: ".jaen .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/jaen/"
        }, {
            contenHtml: ".pucallpa .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/pucallpa/"
        }, {
            contenHtml: ".trujillo .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/trujillo/"
        }, {
            contenHtml: ".trujillo--chiclayo .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/chiclayo/"
        }, {
            contenHtml: ".lima .item:eq(0) .online",
            link: "http://www.catalogospromart.pe/"
        }]
    };
    $.each(t.departamentos, function(t, o) {
        $(o.contenHtml).unbind("click").bind("click", function(t) {
            t.isPropagationStopped() || (window.open(o.link), t.preventDefault(), t.stopPropagation())
        })
    })
}! function(e, o) {
    var t = /[<>&\r\n"']/gm,
        a = {
            "<": "lt;",
            ">": "gt;",
            "&": "amp;",
            "\r": "#13;",
            "\n": "#10;",
            '"': "quot;",
            "'": "#39;"
        };
    e.extend({
        fileDownload: function(i, n) {
            function r() {
                var o = u.cookieValue;
                "string" == typeof o && (o = o.toLowerCase());
                var t = u.cookieName.toLowerCase() + "=" + o;
                if (document.cookie.toLowerCase().indexOf(t) > -1) {
                    b.onSuccess(i);
                    var a = u.cookieName + "=; path=" + u.cookiePath + "; expires=" + new Date(0).toUTCString() + ";";
                    return u.cookieDomain && (a += " domain=" + u.cookieDomain + ";"), document.cookie = a, void d(!1)
                }
                if (w || k) try {
                    var n = w ? w.document : l(k);
                    if (n && null !== n.body && n.body.innerHTML.length) {
                        var c = !0;
                        if (T && T.length) {
                            var s = e(n.body).contents().first();
                            try {
                                s.length && s[0] === T[0] && (c = !1)
                            } catch (p) {
                                if (!p || -2146828218 != p.number) throw p;
                                c = !0
                            }
                        }
                        if (c) return void setTimeout(function() {
                            b.onFail(n.body.innerHTML, i), d(!0)
                        }, 100)
                    }
                } catch (m) {
                    return b.onFail("", i, m), void d(!0)
                }
                setTimeout(r, u.checkInterval)
            }

            function l(e) {
                var o = e[0].contentWindow || e[0].contentDocument;
                return o.document && (o = o.document), o
            }

            function d(e) {
                setTimeout(function() {
                    w && (p && w.close(), s && w.focus && (w.focus(), e && w.close()))
                }, 0)
            }

            function c(e) {
                return e.replace(t, function(e) {
                    return "&" + a[e]
                })
            }
            var s, p, m, u = e.extend({
                    preparingMessageHtml: null,
                    failMessageHtml: null,
                    androidPostUnsupportedMessageHtml: "Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",
                    dialogOptions: {
                        modal: !0
                    },
                    prepareCallback: function(e) {},
                    successCallback: function(e) {},
                    failCallback: function(e, o, t) {},
                    httpMethod: "GET",
                    data: null,
                    checkInterval: 100,
                    cookieName: "fileDownload",
                    cookieValue: "true",
                    cookiePath: "/",
                    cookieDomain: null,
                    popupWindowTitle: "Initiating file download...",
                    encodeHTMLEntities: !0
                }, n),
                g = new e.Deferred,
                f = (navigator.userAgent || navigator.vendor || o.opera).toLowerCase();
            /ip(ad|hone|od)/.test(f) ? s = !0 : -1 !== f.indexOf("android") ? p = !0 : m = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(f) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(f.substr(0, 4));
            var h = u.httpMethod.toUpperCase();
            if (p && "GET" !== h && u.androidPostUnsupportedMessageHtml) return e().dialog ? e("<div>").html(u.androidPostUnsupportedMessageHtml).dialog(u.dialogOptions) : alert(u.androidPostUnsupportedMessageHtml), g.reject();
            var v = null,
                b = {
                    onPrepare: function(o) {
                        u.preparingMessageHtml ? v = e("<div>").html(u.preparingMessageHtml).dialog(u.dialogOptions) : u.prepareCallback && u.prepareCallback(o)
                    },
                    onSuccess: function(e) {
                        v && v.dialog("close"), u.successCallback(e), g.resolve(e)
                    },
                    onFail: function(o, t, a) {
                        v && v.dialog("close"), u.failMessageHtml && e("<div>").html(u.failMessageHtml).dialog(u.dialogOptions), u.failCallback(o, t, a), g.reject(o, t)
                    }
                };
            b.onPrepare(i), null !== u.data && "string" != typeof u.data && (u.data = e.param(u.data));
            var k, w, y, T;
            if ("GET" === h) {
                if (null !== u.data) {
                    var x = i.indexOf("?"); - 1 !== x ? "&" !== i.substring(i.length - 1) && (i += "&") : i += "?", i += u.data
                }
                s || p ? (w = o.open(i), w.document.title = u.popupWindowTitle, o.focus()) : m ? o.location(i) : k = e("<iframe>").hide().prop("src", i).appendTo("body")
            } else {
                var M = "";
                null !== u.data && e.each(u.data.replace(/\+/g, " ").split("&"), function() {
                    var e = this.split("="),
                        o = e[0];
                    e.shift();
                    var t = e.join("=");
                    e = [o, t];
                    var a = u.encodeHTMLEntities ? c(decodeURIComponent(e[0])) : decodeURIComponent(e[0]);
                    if (a) {
                        var i = u.encodeHTMLEntities ? c(decodeURIComponent(e[1])) : decodeURIComponent(e[1]);
                        M += '<input type="hidden" name="' + a + '" value="' + i + '" />'
                    }
                }), m ? (T = e("<form>").appendTo("body"), T.hide().prop("method", u.httpMethod).prop("action", i).html(M)) : (s ? (w = o.open("about:blank"), w.document.title = u.popupWindowTitle, y = w.document, o.focus()) : (k = e("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body"), y = l(k)), y.write("<html><head></head><body><form method='" + u.httpMethod + "' action='" + i + "'>" + M + "</form>" + u.popupWindowTitle + "</body></html>"), T = e(y).find("form")), T.submit()
            }
            setTimeout(r, u.checkInterval);
            var C = g.promise();
            return C.abort = function() {
                d(), k.remove()
            }, C
        }
    })
}(jQuery, this);