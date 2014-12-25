/*
Author: mg12
Update: 2012/05/04
Author URI: http://www.neoease.com/
*/

GoTop = function() {

	this.config = {
		pageWidth			:980,		// ҳ�����
		nodeId				:'go-top',	// Go Top �ڵ�� ID
		nodeWidth			:50,		// Go Top �ڵ����
		distanceToBottom	:60,		// Go Top �ڵ��ϱߵ�ҳ��ײ��ľ���
		distanceToPage		:20,		// Go Top �ڵ���ߵ�ҳ���ұߵľ���
		hideRegionHeight	:130,		// ���ؽڵ�����ĸ߶� (�������ҳ�涥����ʼ)
		text				:''			// Go Top ���ı�����
	};

	this.cache = {
		topLinkThread		:null		// ��ʾ Go Top �ڵ���̱߳��� (���� IE6)
	}
};

GoTop.prototype = {

	init: function(config) {
		this.config = config || this.config;
		var _self = this;

		// ������Ļ, �޸Ľڵ�λ�ú���ʾ״̬
		jQuery(window).scroll(function() {
			_self._scrollScreen({_self:_self});
		});

		// �ı���Ļ�ߴ�, �޸Ľڵ�λ��
		jQuery(window).resize(function() {
			_self._resizeWindow({_self:_self});
		});

		// ��ҳ���в���ڵ�
		_self._insertNode({_self:_self});
	},

	/**
	 * ��ҳ���в���ڵ�
	 */
	_insertNode: function(args) {
		var _self = args._self;

		// ����ڵ㲢�󶨽ڵ��¼�, ���ڵ㱻���, �� 0.4 ���ʱ�������ҳ�涥��
		var topLink = jQuery('<a id="' + _self.config.nodeId + '" href="#">' + _self.config.text + '</a>');
		topLink.appendTo(jQuery('body'));
		if(jQuery.scrollTo) {
			topLink.click(function() {
				jQuery.scrollTo({top:0}, 400);
				return false;
			});
		}

		// �ڵ㵽��Ļ�ұߵľ���
		var right = _self._getDistanceToBottom({_self:_self});

		// IE6 (��֧�� position:fixed) ����ʽ
		if(/MSIE 6/i.test(navigator.userAgent)) {
			topLink.css({
				'display': 'none',
				'position': 'absolute',
				'right': right + 'px'
			});

		// �������������ʽ
		} else {
			topLink.css({
				'display': 'none',
				'position': 'fixed',
				'right': right + 'px',
				'top': (jQuery(window).height() - _self.config.distanceToBottom) + 'px'
			});
		}
	},

	/**
	 * �޸Ľڵ�λ�ú���ʾ״̬
	 */
	_scrollScreen: function(args) {
		var _self = args._self;

		// ���ڵ������������, ���ؽڵ�
		var topLink = jQuery('#' + _self.config.nodeId);
		if(jQuery(document).scrollTop() <= _self.config.hideRegionHeight) {
			clearTimeout(_self.cache.topLinkThread);
			topLink.hide();
			return;
		}

		// ����������֮��, IE6 ���޸Ľڵ���ҳ���е�λ��, ����ʾ�ڵ�
		if(/MSIE 6/i.test(navigator.userAgent)) {
			clearTimeout(_self.cache.topLinkThread);
			topLink.hide();

			_self.cache.topLinkThread = setTimeout(function() {
				var top = jQuery(document).scrollTop() + jQuery(window).height() - _self.config.distanceToBottom;
				topLink.css({'top': top + 'px'}).fadeIn();
			}, 50);

		// ����������֮��, �����������ʾ�ڵ�
		} else {
			topLink.fadeIn();
		}
	},

	/**
	 * �޸Ľڵ�λ��
	 */
	_resizeWindow: function(args) {
		var _self = args._self;

		var topLink = jQuery('#' + _self.config.nodeId);

		// �ڵ㵽��Ļ�ұߵľ���
		var right = _self._getDistanceToBottom({_self:_self});

		// �ڵ㵽��Ļ�����ľ���
		var top = jQuery(window).height() - _self.config.distanceToBottom;
		// IE6 ��ʹ�õ�ҳ�涥���ľ���ȡ��
		if(/MSIE 6/i.test(navigator.userAgent)) {
			top += jQuery(document).scrollTop();
		}

		// �ض���ڵ�λ��
		topLink.css({
			'right': right + 'px',
			'top': top + 'px'
		});
	},

	/**
	 * ��ȡ�ڵ㵽��Ļ�ұߵľ���
	 */
	_getDistanceToBottom: function(args) {
		var _self = args._self;

		// �ڵ㵽��Ļ�ұߵľ��� = (��Ļ���� - ҳ����� + 1 "�˴� 1px ��������ƫ��" ) / 2 - �ڵ���� - �ڵ���ߵ�ҳ���ұߵĿ��� (20px), ������ұ߾�����Ļ�߽粻С�� 10px
		//var right = parseInt((jQuery(window).width() - _self.config.pageWidth + 1)/2 - _self.config.nodeWidth - _self.config.distanceToPage, 10);
		var right = 20;
		//if(right < 10) {
		//	right = 10;
		//}

		return right;
	}
};